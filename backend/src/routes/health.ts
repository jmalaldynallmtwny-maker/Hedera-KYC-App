import { Router } from 'express';
import { getCitizensDb, checkDatabaseHealth } from '../lib/database.js';
import { minioService } from '../lib/minio.js';
import { hederaService } from '../services/hederaService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [dbHealth, minioHealth, redisHealth] = await Promise.all([
      checkDatabaseHealth(),
      minioService.checkHealth(),
      checkRedisHealth()
    ]);

    const allServicesHealthy = Object.values(dbHealth).every(Boolean) && 
                              minioHealth && 
                              redisHealth;

    res.json({
      status: allServicesHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        postgres: dbHealth,
        minio: minioHealth,
        redis: redisHealth,
        hedera: hederaService.isInitialized
      },
      stats: await getServiceStats()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable',
      services: {
        postgres: false,
        minio: false,
        redis: false,
        hedera: false
      }
    });
  }
});

async function checkRedisHealth(): Promise<boolean> {
  try {
    // This would check Redis connection
    // For now, return true if Redis URL is set
    return !!process.env.REDIS_URL;
  } catch {
    return false;
  }
}

async function getServiceStats(): Promise<any> {
  try {
    const citizensDb = getCitizensDb();
    const citizenCount = await citizensDb.citizen.count();
    
    return {
      citizens: citizenCount,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV
    };
  } catch (error) {
    console.error('Error getting service stats:', error);
    return {};
  }
}

export default router;
