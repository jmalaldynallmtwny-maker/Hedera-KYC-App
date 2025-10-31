import { Worker } from 'bullmq';
import { connection } from '../queues/index.js';

export const asrWorker = () => {
  const worker = new Worker('asr-jobs', async (job) => {
    console.log(`🎤 Processing ASR job: ${job.id}`);
    
    const { requestId, audioData } = job.data;

    try {
      // Simulate audio processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transcription result
      const transcript = "This is a mock transcript of the audio content. In a real implementation, this would use Whisper.cpp or OpenAI Whisper.";
      
      console.log(`✅ ASR completed for request: ${requestId}`);
      
      return {
        success: true,
        requestId,
        transcript,
        confidence: 0.92,
        language: 'en',
        processingTime: 2000
      };
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ ASR failed for job ${job.id}:`, message);
      throw error;
    }
  }, { 
    connection,
    concurrency: 2 
  });

  worker.on('completed', (job) => {
    console.log(`✅ ASR job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ ASR job ${job?.id} failed:`, err);
  });

  return worker;
};
