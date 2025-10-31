import { asrWorker } from './asrWorker.js';
import { deleteWorker } from './deleteWorker.js';
import { hederaWorker } from './hederaWorker.js';
import { exportWorker } from './exportWorker.js';
import { sessionCleanupWorker } from './sessionCleanupWorker.js';

export const startWorkers = () => {
  console.log('👷 Starting workers...');
  
  // Start all workers
  asrWorker();
  deleteWorker();
  hederaWorker();
  exportWorker();
  sessionCleanupWorker(); // Session cleanup worker
  
  console.log('✅ All workers started successfully');
};

export { asrWorker, deleteWorker, hederaWorker, exportWorker, sessionCleanupWorker };
