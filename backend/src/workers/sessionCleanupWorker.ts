import { Worker } from 'bullmq';
import { connection } from '../queues/index.js';
import { getBankDb } from '../lib/database.js';
import { cleanupExpiredSessions } from '../middleware/auth.js';

export const sessionCleanupWorker = () => {
  const worker = new Worker('session-cleanup', async (job) => {
    console.log('🧹 Cleaning up expired sessions...');
    
    try {
      // Cleanup active memory
      await cleanupExpiredSessions();

      // Cleanup database
      const banks = ['baybank', 'oasisbank', 'zenbank', 'arcbank', 'nexbank'];
      
      for (const bankId of banks) {
        const bankDb = getBankDb(bankId);
        
        await bankDb.session.updateMany({
          where: {
            isActive: true,
            lastActivity: {
              lt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes
            }
          },
          data: {
            isActive: false,
            endedAt: new Date()
          }
        });
      }

      console.log('✅ Session cleanup completed');
      
      return {
        success: true,
        cleanedAt: new Date().toISOString()
      };
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Session cleanup failed:', message);
      throw error;
    }
  }, { 
    connection,
    concurrency: 1
  });

  return worker;
};
