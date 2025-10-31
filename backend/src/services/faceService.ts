// backend/src/services/faceService.ts
import { getBankDb } from '../lib/database.js';
import { decrypt } from '../lib/crypto.js';
import { AppError } from '../middleware/errorHandler.js';
import type { GenericAdmin, GenericAdminFace } from '../types/database.js';
import { getErrorMessage } from '../utils/typeGuards.js';

export interface FaceEmbedding {
  enc_embedding: string;
  iv: string;
  tag: string;
  dims: number;
}

export interface FaceMatchResult {
  match: boolean;
  score: number;
  bestMatch?: {
    score: number;
    embeddingId: string;
  };
}

export class FaceService {
  private similarityThreshold: number;

  constructor() {
    this.similarityThreshold = parseFloat(process.env.FACE_SIMILARITY_THRESHOLD || '0.90');
  }

  async enrollFace(adminId: string, bankId: string, embeddings: FaceEmbedding[]): Promise<void> {
    try {
      const bankDb = getBankDb(bankId);

      // Store each embedding
      for (const embedding of embeddings) {
        await bankDb.adminFace.create({
          data: {
            adminId,
            enc_embedding: embedding.enc_embedding,
            iv: embedding.iv,
            tag: embedding.tag,
            dims: embedding.dims
          }
        });
      }

      // Mark admin as face enrolled
      await bankDb.admin.update({
        where: { id: adminId },
        data: { face_enrolled: true }
      });

    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error('Face enrollment error:', message);
      throw new AppError('Failed to enroll face', 500);
    }
  }

  async verifyFace(adminId: string, bankId: string, probeEmbedding: FaceEmbedding): Promise<FaceMatchResult> {
    try {
      const bankDb = getBankDb(bankId);

      // Get all stored embeddings for this admin
      const storedFaces = await bankDb.adminFace.findMany({
        where: { adminId }
      });

      if (storedFaces.length === 0) {
        return { match: false, score: 0 };
      }

      // Decrypt probe embedding
      const probeVector = await this.decryptEmbedding(probeEmbedding);

      let bestScore = 0;
      let bestMatchId = '';

      // Compare with all stored embeddings
      for (const storedFace of storedFaces) {
        const storedVector = await this.decryptEmbedding({
          enc_embedding: storedFace.enc_embedding,
          iv: storedFace.iv,
          tag: storedFace.tag,
          dims: storedFace.dims
        });

        const score = this.cosineSimilarity(probeVector, storedVector);
        
        if (score > bestScore) {
          bestScore = score;
          bestMatchId = storedFace.id;
        }
      }

      const match = bestScore >= this.similarityThreshold;

      return {
        match,
        score: bestScore,
        bestMatch: match ? { score: bestScore, embeddingId: bestMatchId } : undefined
      };

    } catch (error) {
      console.error('Face verification error:', error);
      throw new AppError('Failed to verify face', 500);
    }
  }

  private async decryptEmbedding(embedding: FaceEmbedding): Promise<number[]> {
    try {
      const decrypted = decrypt({
        encrypted: embedding.enc_embedding,
        iv: embedding.iv,
        tag: embedding.tag
      });

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Embedding decryption error:', error);
      throw new AppError('Failed to decrypt face embedding', 500);
    }
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same dimensions');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async deleteFaceData(adminId: string, bankId: string): Promise<void> {
    try {
      const bankDb = getBankDb(bankId);

      await bankDb.adminFace.deleteMany({
        where: { adminId }
      });

      await bankDb.admin.update({
        where: { id: adminId },
        data: { face_enrolled: false }
      });

    } catch (error) {
      console.error('Face data deletion error:', error);
      throw new AppError('Failed to delete face data', 500);
    }
  }

  // Helper method to convert number arrays to FaceEmbedding
  convertToFaceEmbedding(embeddingArray: number[] | number[][], encryptedData: any): FaceEmbedding {
    if (Array.isArray(embeddingArray[0])) {
      // Handle 2D array - take first embedding
      const firstEmbedding = (embeddingArray as number[][])[0];
      return {
        enc_embedding: encryptedData.encrypted,
        iv: encryptedData.iv,
        tag: encryptedData.tag,
        dims: firstEmbedding.length
      };
    } else {
      // Handle 1D array
      return {
        enc_embedding: encryptedData.encrypted,
        iv: encryptedData.iv,
        tag: encryptedData.tag,
        dims: (embeddingArray as number[]).length
      };
    }
  }
}

export const faceService = new FaceService();
