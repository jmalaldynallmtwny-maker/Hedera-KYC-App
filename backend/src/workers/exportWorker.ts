import { Worker } from 'bullmq';
import { connection } from '../queues/index.js';

export const exportWorker = () => {
  const worker = new Worker('export-reports', async (job) => {
    console.log(`📊 Processing export job: ${job.id}`);
    
    const { format, filters, requestedByAdminId } = job.data;

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock report data
      const reportData = {
        title: 'KYC Platform Analytics Report',
        generatedAt: new Date().toISOString(),
        format,
        filters,
        data: {
          totalRequests: 150,
          approved: 45,
          rejected: 15,
          pending: 90,
          averageProcessingTime: '2.5 days',
          topRejectionReasons: [
            'Incomplete documentation',
            'Identity verification failed',
            'Suspicious activity'
          ]
        },
        charts: [
          {
            type: 'bar',
            title: 'Requests by Status',
            data: { approved: 45, rejected: 15, pending: 90 }
          }
        ]
      };
      
      const reportUrl = `/api/admin/exports/report-${job.id}.${format}`;
      
      console.log(`✅ Export completed: ${reportUrl}`);
      
      return {
        success: true,
        reportUrl,
        reportId: job.id,
        format,
        generatedAt: reportData.generatedAt,
        downloadUrl: `http://localhost:3000${reportUrl}`
      };
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Export job ${job.id} failed:`, message);
      throw error;
    }
  }, { 
    connection,
    concurrency: 2 
  });

  worker.on('completed', (job) => {
    console.log(`✅ Export job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Export job ${job?.id} failed:`, err);
  });

  return worker;
};
