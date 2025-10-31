import { getCitizensDb, getBankDb } from '../lib/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { hashNNI, generateSalt, computeSummaryHash, encrypt, encryptStatusToken } from '../lib/crypto.js';
import { minioService } from '../lib/minio.js';
import { asrQueue, hederaQueue } from '../queues/index.js';
import type { GenericPendingRequest } from '../types/database.js';

export const kycService = {
  async lookupCitizen(nni: string) {
    try {
      const citizensDb = getCitizensDb();
      
      const nniHash = hashNNI(nni);

      const citizen = await citizensDb.citizen.findUnique({
        where: { nni_index: nniHash },
        select: {
          nni_masked: true,
          given_name: true,
          family_name: true,
          full_name: true,
          birthdate: true,
          gender: true,
          place_of_birth: true
        }
      });

      return {
        found: !!citizen,
        citizen: citizen || null
      };
    } catch (error) {
      console.error('KYC lookup error:', error);
      throw new AppError('Failed to lookup citizen', 500);
    }
  },

  async createKycRequest(data: {
    masked_nni: string;
    payload_summary: any;
    images: string[];
    bankId: string;
  }) {
    try {
      const bankDb = getBankDb(data.bankId);
      
      // Generate request ID and salt
      const requestId = crypto.randomUUID();
      const salt = generateSalt();
      
      // Compute summary hash
      const summaryHash = computeSummaryHash(data.payload_summary, salt);

      // Encrypt salt for storage
      const encryptedSalt = encrypt(salt);

      // Set voting deadline (24 hours from now)
      const votingDeadline = new Date();
      votingDeadline.setHours(votingDeadline.getHours() + 24);

      // Create pending request
      const pendingRequest = await bankDb.pendingRequest.create({
        data: {
          id: requestId,
          masked_nni: data.masked_nni,
          payload_summary: data.payload_summary,
          summaryHash,
          salt_ref: encryptedSalt,
          voting_deadline: votingDeadline,
          status: 'PENDING'
        }
      });

      // Generate status token
      const statusToken = encryptStatusToken({
        requestId: pendingRequest.id,
        bankId: data.bankId,
        exp: votingDeadline.toISOString()
      });

      // Process images if any
      if (data.images && data.images.length > 0) {
        await this.processImages(requestId, data.images);
      }

      // Enqueue ASR processing if there's audio data
      if (data.payload_summary.audio_transcript) {
        await asrQueue.add('process-audio', {
          requestId,
          audioData: data.payload_summary.audio_transcript
        });
      }

      return {
        requestId: pendingRequest.id,
        status: 'PENDING',
        statusToken: statusToken,
        votingDeadline: votingDeadline.toISOString(),
        summaryHash
      };
    } catch (error) {
      console.error('KYC create error:', error);
      throw new AppError('Failed to create KYC request', 500);
    }
  },

  async getRequestStatus(requestId: string, bankId: string) {
    try {
      const bankDb = getBankDb(bankId);
      
      const request = await bankDb.pendingRequest.findUnique({
        where: { id: requestId },
        include: {
          votes: {
            select: {
              bankId: true,
              adminId: true,
              vote: true,
              reason: true,
              createdAt: true,
              admin: {
                select: {
                  username: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      if (!request) {
        return null;
      }

      const votes = request.votes || [];
      const approved = votes.filter((v: any) => v.vote === 'APPROVE').length;
      const rejected = votes.filter((v: any) => v.vote === 'REJECT').length;
      const pending = 5 - (approved + rejected); // 5 banks total

      return {
        requestId: request.id,
        status: request.status,
        counts: { approved, rejected, pending },
        votes: request.votes,
        summaryHash: request.summaryHash,
        createdAt: request.created_at,
        votingDeadline: request.voting_deadline,
        payloadSummary: request.payload_summary
      };
    } catch (error) {
      console.error('KYC status error:', error);
      throw new AppError('Failed to get request status', 500);
    }
  },

  async processImages(requestId: string, images: string[]) {
    try {
      // In a real implementation, this would process images:
      // - Validate image format and size
      // - Extract metadata
      // - Store in MinIO
      // - Generate thumbnails
      
      for (const image of images) {
        // Simulate image processing
        console.log(`Processing image for request ${requestId}: ${image}`);
      }

      return true;
    } catch (error) {
      console.error('Image processing error:', error);
      throw new AppError('Failed to process images', 500);
    }
  },

  async finalizeRequest(requestId: string, bankId: string) {
    try {
      const bankDb = getBankDb(bankId);
      
      // Get request with votes
      const request = await bankDb.pendingRequest.findUnique({
        where: { id: requestId },
        include: {
          votes: true
        }
      });

      if (!request) {
        throw new AppError('Request not found', 404);
      }

      const approved = request.votes.filter((v: any) => v.vote === 'APPROVE').length;
      const rejected = request.votes.filter((v: any) => v.vote === 'REJECT').length;

      let newStatus = 'PENDING';
      
      if (rejected > 0) {
        newStatus = 'REJECTED';
      } else if (approved >= 5) {
        newStatus = 'APPROVED';
        
        // Create user account if approved
        await bankDb.user.create({
          data: {
            citizen_ref: request.citizen_ref,
            metadata: {
              approvedAt: new Date(),
              approvedBy: request.votes.map((v: any) => v.adminId)
            }
          }
        });

        // Enqueue Hedera publishing
        await hederaQueue.add('publish-proof', {
          requestId,
          bankId,
          summaryHash: request.summaryHash,
          counts: { approved, rejected }
        });
      }

      // Update request status
      await bankDb.pendingRequest.update({
        where: { id: requestId },
        data: { status: newStatus }
      });

      return { newStatus, approved, rejected };
    } catch (error) {
      console.error('Finalize request error:', error);
      throw new AppError('Failed to finalize request', 500);
    }
  }
};
