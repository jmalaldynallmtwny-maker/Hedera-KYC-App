// backend/src/workers/hederaWorker.ts
import { Worker } from 'bullmq';
import { connection } from '../queues/index.js';
import { hederaService } from '../services/hederaService.js';

export const hederaWorker = () => {
    const worker = new Worker('hedera-publish', async (job) => {
        console.log(`🔗 Processing Hedera job: ${job.id}`);
        
        const { requestId, bankId, summaryHash, counts } = job.data;

        try {
            // Ensure Hedera service is initialized
            if (!hederaService.isInitialized) {
                await hederaService.initialize();
            }

            const result = await hederaService.publishProof(requestId, bankId);
            
            if (result.success) {
                console.log(`✅ Hedera proof published for request: ${requestId}, Message ID: ${result.topicMessageId}`);
                
                return {
                    success: true,
                    requestId,
                    bankId,
                    summaryHash,
                    topicMessageId: result.topicMessageId,
                    publishedAt: new Date().toISOString(),
                    simulated: !hederaService.isInitialized
                };
            } else {
                throw new Error(result.error || 'Hedera publishing failed');
            }
            
        } catch (error: any) {
            console.error(`❌ Hedera publishing failed for job ${job.id}:`, error);
            
            return {
                success: false,
                requestId,
                bankId,
                error: error.message,
                publishedAt: new Date().toISOString(),
                simulated: true
            };
        }
    }, { 
        connection,
        concurrency: 1
    });

    worker.on('completed', (job, result: any) => {
        if (result.success) {
            console.log(`✅ Hedera job ${job.id} completed successfully`);
        } else {
            console.warn(`⚠️ Hedera job ${job.id} completed with errors: ${result.error}`);
        }
    });

    worker.on('failed', (job, err) => {
        console.error(`❌ Hedera job ${job?.id} failed:`, err);
    });

    return worker;
};
