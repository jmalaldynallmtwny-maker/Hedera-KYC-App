// Filename: src/lib/redis.ts
import Redis from 'ioredis';
import { getErrorMessage } from '../utils/typeGuards.js';

// Redis client singleton
let redisClient: Redis | null = null;

/**
 * Connect to Redis
 * Establishes a connection to Redis with retry logic
 */
export const connectRedis = async (): Promise<Redis> => {
  if (redisClient) return redisClient;

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
  console.log('🔌 Connecting to Redis...');
  
  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times: number) => {
      if (times > 3) {
        console.error('❌ Redis connection failed after 3 retries');
        return null;
      }
      const delay = Math.min(times * 100, 2000);
      console.log(`⏳ Retrying Redis connection in ${delay}ms (attempt ${times}/3)`);
      return delay;
    },
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        console.log('🔄 Reconnecting to Redis due to READONLY error');
        return true;
      }
      return false;
    }
  });

  redisClient.on('connect', () => {
    console.log('✅ Redis connected successfully');
  });

  redisClient.on('ready', () => {
    console.log('✅ Redis is ready to accept commands');
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis error:', err.message);
  });

  redisClient.on('close', () => {
    console.log('⚠️ Redis connection closed');
  });

  redisClient.on('reconnecting', () => {
    console.log('🔄 Redis reconnecting...');
  });

  // Test connection
  try {
    await redisClient.ping();
    console.log('✅ Redis ping successful');
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('❌ Redis ping failed:', message);
    throw error;
  }

  return redisClient;
};

/**
 * Get Redis client instance
 * @throws Error if Redis is not initialized
 */
export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis not initialized. Call connectRedis() first.');
  }
  return redisClient;
};

/**
 * Disconnect from Redis
 * Gracefully closes the Redis connection
 */
export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.log('✅ Redis disconnected');
  }
};

/**
 * Session Manager using Redis
 * Handles session storage, retrieval, and cleanup in Redis
 */
export class RedisSessionManager {
  private redis: Redis;
  private readonly SESSION_PREFIX = 'session:';
  private readonly SESSION_TTL = 30 * 60; // 30 minutes in seconds

  constructor(redis: Redis) {
    this.redis = redis;
  }

  /**
   * Create a new session in Redis
   */
  async createSession(sessionId: string, data: SessionData): Promise<void> {
    const key = this.SESSION_PREFIX + sessionId;
    await this.redis.setex(key, this.SESSION_TTL, JSON.stringify(data));
    console.log(`✅ Session created: ${sessionId}`);
  }

  /**
   * Get session data from Redis
   * Automatically refreshes TTL on access
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    const key = this.SESSION_PREFIX + sessionId;
    const data = await this.redis.get(key);
    
    if (!data) {
      console.log(`⚠️ Session not found: ${sessionId}`);
      return null;
    }
    
    // Refresh TTL on every access (sliding expiration)
    await this.redis.expire(key, this.SESSION_TTL);
    
    return JSON.parse(data);
  }

  /**
   * Update existing session data
   */
  async updateSession(sessionId: string, data: Partial<SessionData>): Promise<void> {
    const key = this.SESSION_PREFIX + sessionId;
    const existing = await this.getSession(sessionId);
    
    if (!existing) {
      throw new Error(`Session not found: ${sessionId}`);
    }
    
    const merged = { ...existing, ...data };
    await this.redis.setex(key, this.SESSION_TTL, JSON.stringify(merged));
    console.log(`✅ Session updated: ${sessionId}`);
  }

  /**
   * Delete a specific session
   */
  async deleteSession(sessionId: string): Promise<void> {
    const key = this.SESSION_PREFIX + sessionId;
    const deleted = await this.redis.del(key);
    
    if (deleted > 0) {
      console.log(`✅ Session deleted: ${sessionId}`);
    } else {
      console.log(`⚠️ Session not found for deletion: ${sessionId}`);
    }
  }

  /**
   * Delete all sessions for a specific admin
   */
  async deleteAllUserSessions(adminId: string, bankId: string): Promise<number> {
    const pattern = this.SESSION_PREFIX + '*';
    let cursor = '0';
    let deletedCount = 0;
    
    do {
      // Use SCAN instead of KEYS for better performance
      const [newCursor, keys] = await this.redis.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        100
      );
      cursor = newCursor;
      
      for (const key of keys) {
        const data = await this.redis.get(key);
        if (data) {
          const session: SessionData = JSON.parse(data);
          if (session.adminId === adminId && session.bankId === bankId) {
            await this.redis.del(key);
            deletedCount++;
          }
        }
      }
    } while (cursor !== '0');
    
    console.log(`✅ Deleted ${deletedCount} sessions for admin: ${adminId}`);
    return deletedCount;
  }

  /**
   * Get all active session IDs
   */
  async getAllActiveSessions(): Promise<string[]> {
    const pattern = this.SESSION_PREFIX + '*';
    const keys: string[] = [];
    let cursor = '0';
    
    do {
      const [newCursor, foundKeys] = await this.redis.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        100
      );
      cursor = newCursor;
      keys.push(...foundKeys);
    } while (cursor !== '0');
    
    return keys.map(key => key.replace(this.SESSION_PREFIX, ''));
  }

  /**
   * Check if a session exists and is active
   */
  async isSessionActive(sessionId: string): Promise<boolean> {
    const session = await this.getSession(sessionId);
    return session !== null && session.isActive === true;
  }

  /**
   * Get session count for statistics
   */
  async getSessionCount(): Promise<number> {
    const sessions = await this.getAllActiveSessions();
    return sessions.length;
  }

  /**
   * Clean up all expired sessions (they auto-expire, but this is for manual cleanup)
   */
  async cleanupExpiredSessions(): Promise<number> {
    // Redis automatically handles TTL expiration
    // This method is here for compatibility and manual cleanup if needed
    const sessions = await this.getAllActiveSessions();
    console.log(`ℹ️ Currently ${sessions.length} active sessions in Redis`);
    return sessions.length;
  }
}

// Session data interface
export interface SessionData {
  adminId: string;
  bankId: string;
  isActive: boolean;
  createdAt: string;
  lastActivity: string;
  userAgent?: string;
  ipAddress?: string;
}

// Global session manager instance
export let sessionManager: RedisSessionManager;

/**
 * Initialize the session manager
 * Must be called after Redis connection is established
 */
export const initSessionManager = async (): Promise<RedisSessionManager> => {
  const redis = await connectRedis();
  sessionManager = new RedisSessionManager(redis);
  console.log('✅ Session manager initialized');
  return sessionManager;
};

/**
 * Get the global session manager instance
 */
export const getSessionManager = (): RedisSessionManager => {
  if (!sessionManager) {
    throw new Error('Session manager not initialized. Call initSessionManager() first.');
  }
  return sessionManager;
};



