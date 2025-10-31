import { Client, BucketItem } from 'minio';
import { Readable } from 'stream';
import { getErrorMessage } from '../utils/typeGuards.js';

export class MinioService {
  private static instance: MinioService;
  private client: Client | null = null;
  private isInitialized: boolean = false;

private constructor() {
  if (!process.env.MINIO_ENDPOINT) {
    console.warn('⚠️  MINIO_ENDPOINT not set, MinIO operations will fail');
    this.client = null;
    return;
  }
  
  try {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT!,
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('❌ Failed to initialize MinIO client:', message);
    this.client = null;
  }
}

  public static getInstance(): MinioService {
    if (!MinioService.instance) {
      MinioService.instance = new MinioService();
    }
    return MinioService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      const bucketName = process.env.MINIO_BUCKET || 'kyc-requests';
      await this.ensureBucketExists(bucketName);
      this.isInitialized = true;
      console.log(`✅ MinIO initialized successfully`);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error('❌ MinIO initialization failed:', message);
      throw new Error('MinIO initialization failed');
    }
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
    if (!this.client) {
      throw new Error('MinIO client not initialized');
    }
    
    try {
      const exists = await this.client.bucketExists(bucketName);
      if (!exists) {
        await this.client.makeBucket(bucketName);
        console.log(`✅ Created bucket: ${bucketName}`);
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error(`❌ Failed to ensure bucket ${bucketName}:`, message);
      throw error;
    }
  }

  async getPresignedUploadUrl(bucketName: string, objectName: string, expiresIn: number = 3600): Promise<string> {
    if (!this.client) throw new Error('MinIO client not initialized');
    await this.ensureBucketExists(bucketName);
    return await this.client!.presignedPutObject(bucketName, objectName, expiresIn);
  }

  async getPresignedDownloadUrl(bucketName: string, objectName: string, expiresIn: number = 3600): Promise<string> {
    if (!this.client) throw new Error('MinIO client not initialized');
    return await this.client!.presignedGetObject(bucketName, objectName, expiresIn);
  }

  async getFile(objectName: string, bucketName?: string): Promise<Buffer> {
    if (!this.client) throw new Error('MinIO client not initialized');
    const bucket = bucketName || process.env.MINIO_BUCKET || 'kyc-requests';
    
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      this.client!.getObject(bucket, objectName, (err: Error | null, stream?: Readable) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!stream) {
          reject(new Error('No stream received from MinIO'));
          return;
        }
        
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (streamErr: Error) => reject(streamErr));
      });
    });
  }

  async uploadFile(bucketName: string, objectName: string, buffer: Buffer, contentType?: string): Promise<void> {
    if (!this.client) throw new Error('MinIO client not initialized');
    await this.ensureBucketExists(bucketName);
    
    const metadata: Record<string, string> = {};
    if (contentType) {
      metadata['Content-Type'] = contentType;
    }
    
    await this.client!.putObject(bucketName, objectName, buffer, buffer.length, metadata);
  }

  async putObject(
    bucketName: string, 
    objectName: string, 
    stream: Buffer | Readable | string, 
    size: number, 
    metadata?: Record<string, string>
  ): Promise<void> {
    if (!this.client) throw new Error('MinIO client not initialized');
    await this.ensureBucketExists(bucketName);
    await this.client!.putObject(bucketName, objectName, stream, size, metadata || {});
  }

  async deleteObject(bucketName: string, objectName: string): Promise<void> {
    if (!this.client) throw new Error('MinIO client not initialized');
    await this.client!.removeObject(bucketName, objectName);
  }

  async listObjects(bucketName: string, prefix: string): Promise<string[]> {
    if (!this.client) throw new Error('MinIO client not initialized');
    const objects: string[] = [];
    const stream = this.client!.listObjects(bucketName, prefix, true);

    return new Promise((resolve, reject) => {
      stream.on('data', (obj: BucketItem) => {
        if (obj.name) {
          objects.push(obj.name);
        }
      });
      stream.on('end', () => resolve(objects));
      stream.on('error', (err: Error) => reject(err));
    });
  }

  async checkHealth(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.client!.listBuckets();
      return true;
    } catch {
      return false;
    }
  }
}

export const minioService = MinioService.getInstance();
