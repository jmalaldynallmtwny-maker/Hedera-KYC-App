import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { connectDatabases, disconnectDatabases } from './lib/database.js';
import { initSessionManager, disconnectRedis } from './lib/redis.js';
import { initializeQueues } from './queues/index.js';
import { startWorkers } from './workers/index.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    console.log('🚀 Starting Interactive KYC Backend...');
    console.log('📝 Environment:', process.env.NODE_ENV);
    
    // Connect to Redis first (required for sessions)
    console.log('🔌 Connecting to Redis...');
    await initSessionManager();
    console.log('✅ Redis and Session Manager initialized');
    
    // Connect to all databases
    console.log('🗄️  Connecting to databases...');
    await connectDatabases();
    console.log('✅ Databases connected successfully');
    
    // Initialize MinIO
    const { minioService } = await import('./lib/minio.js');
    await minioService.initialize();
    console.log('✅ MinIO initialized successfully');
    
    // Initialize Hedera service
    const { hederaService } = await import('./services/hederaService.js');
    if (process.env.HEDERA_OPERATOR_ID && process.env.HEDERA_OPERATOR_KEY) {
      await hederaService.initialize();
      console.log('✅ Hedera service initialized successfully');
    } else {
      console.warn('⚠️  Hedera credentials not provided, running in simulation mode');
    }
    
    // Initialize queues
    initializeQueues();
    console.log('✅ Queues initialized successfully');
    
    // Start workers
    startWorkers();
    console.log('✅ Workers started successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log('🎉 Server started successfully!');
      console.log(`📍 Port: ${PORT}`);
      console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`🔧 Backend URL: http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log('⏰', new Date().toISOString());
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully...');
      await disconnectDatabases();
      await disconnectRedis();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully...');
      await disconnectDatabases();
      await disconnectRedis();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(error.name, error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
  process.exit(1);
});

bootstrap();
