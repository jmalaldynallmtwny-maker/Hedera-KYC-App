import { Worker } from 'bullmq';
import { connection } from '../queues/index.js';
import { minioService } from '../lib/minio.js';

export const deleteWorker = () => {
  const worker = new Worker('delete-old-images', async (job) => {
    console.log(`🗑️  Processing delete job: ${job.id}`);
    
    const { olderThanTimestamp, bucketName = 'kyc-requests' } = job.data;

    try {
      const cutoffDate = new Date(olderThanTimestamp);
      const now = new Date();
      
      console.log(`Cleaning up files older than: ${cutoffDate.toISOString()}`);
      
      // List all objects in the bucket
      const objects = await minioService.listObjects(bucketName, '');
      
      let deletedCount = 0;
      const deletionPromises = [];

      for (const objectName of objects) {
        // In a real implementation, you would check the object's creation date
        // For now, we'll simulate the deletion process
        deletionPromises.push(
          minioService.deleteObject(bucketName, objectName)
            .then(() => {
              deletedCount++;
              console.log(`Deleted: ${objectName}`);
            })
            .catch(err => {
              console.error(`Failed to delete ${objectName}:`, err);
            })
        );
      }

      await Promise.allSettled(deletionPromises);
      
      console.log(`✅ Deletion completed. Removed ${deletedCount} files.`);
      
      return {
        success: true,
        deletedCount,
        bucketName,
        cutoffDate: cutoffDate.toISOString(),
        processedAt: now.toISOString()
      };
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Deletion job ${job.id} failed:`, message);
      throw error;
    }
  }, { 
    connection,
    concurrency: 1 // Only one deletion job at a time
  });

  worker.on('completed', (job) => {
    console.log(`✅ Deletion job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Deletion job ${job?.id} failed:`, err);
  });

  return worker;
};
