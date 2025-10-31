// backend/src/queues/index.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

export const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

// Queues
export const asrQueue = new Queue('asr-jobs', { 
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 1000,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  }
});

export const deleteQueue = new Queue('delete-old-images', { 
  connection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 500,
    delay: 1000,
    attempts: 5
  }
});

export const hederaQueue = new Queue('hedera-publish', { 
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 500,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  }
});

export const exportQueue = new Queue('export-reports', { 
  connection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 100,
    attempts: 3
  }
});

// Queue events for monitoring
export const queueEvents = {
  asr: new QueueEvents('asr-jobs', { connection }),
  delete: new QueueEvents('delete-old-images', { connection }),
  hedera: new QueueEvents('hedera-publish', { connection }),
  export: new QueueEvents('export-reports', { connection })
};

export const initializeQueues = () => {
  console.log('✅ Queues initialized:', {
    asr: 'asr-jobs',
    delete: 'delete-old-images', 
    hedera: 'hedera-publish',
    export: 'export-reports'
  });
};

// Utility function to get queue metrics
export const getQueueMetrics = async () => {
  const queues = [asrQueue, deleteQueue, hederaQueue, exportQueue];
  const metrics = [];

  for (const queue of queues) {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
      queue.getDelayed()
    ]);

    metrics.push({
      name: queue.name,
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length
    });
  }

  return metrics;
};
