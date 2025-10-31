import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppError } from './errorHandler.js';
import { getBankDb } from '../lib/database.js';
import { sessionManager } from '../lib/redis.js';
import { getErrorMessage } from '../utils/typeGuards.js';

export interface AuthRequest extends Request {
  admin?: {
    adminId: string;
    username: string;
    bankId: string;
    faceEnrolled: boolean;
    sessionId: string;
    iat?: number;
    exp?: number;
  };
  user?: any;
}

// Token expiry durations
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = extractToken(req);
    
    if (!accessToken) {
      throw new AppError('Access token required', 401);
    }

    try {
      // Verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as any;
      
      // Check if session exists in Redis
      const session = await sessionManager.getSession(decoded.sessionId);
      
      if (!session || !session.isActive) {
        throw new AppError('Session expired or invalid', 401);
      }

      // Verify that session belongs to the correct user
      if (session.adminId !== decoded.adminId || session.bankId !== decoded.bankId) {
        throw new AppError('Session mismatch', 401);
      }
      
      // Update last activity time (getSession updates TTL automatically)
      await sessionManager.updateSession(decoded.sessionId, {
        lastActivity: new Date().toISOString()
      });
      
      req.admin = decoded;
      next();
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        // Attempt to refresh token using refresh token
        await handleTokenRefresh(req, res, next);
      } else {
        throw error;
      }
    }
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Authentication failed', 401));
    }
  }
};

// Extract token from request
const extractToken = (req: Request): string | null => {
  return (
    req.cookies?.access_token ||
    req.headers.authorization?.replace('Bearer ', '') ||
    null
  );
};

// Handle token refresh
const handleTokenRefresh = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    
    if (!refreshToken) {
      throw new AppError('Refresh token required', 401);
    }

    // Verify refresh token
    const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    // Check session in Redis
    const session = await sessionManager.getSession(refreshDecoded.sessionId);
    
    if (!session || !session.isActive) {
      throw new AppError('Invalid refresh token', 401);
    }

    // Verify session in DB
    const bankDb = getBankDb(refreshDecoded.bankId);
    const dbSession = await bankDb.session.findUnique({
      where: { id: refreshDecoded.sessionId }
    });

    if (!dbSession || !dbSession.is_active) {
      await sessionManager.deleteSession(refreshDecoded.sessionId);
      throw new AppError('Session terminated', 401);
    }

    // Create new tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateNewTokens(
      refreshDecoded.adminId,
      refreshDecoded.bankId,
      refreshDecoded.sessionId
    );

    // Set new tokens in cookies
    setTokenCookies(res, accessToken, newRefreshToken);

    // Decode new access token and set in request
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as any;
    req.admin = decoded;
    
    next();
  } catch (error: unknown) {
    next(new AppError('Token refresh failed', 401));
  }
};

// Generate new tokens
const generateNewTokens = async (adminId: string, bankId: string, sessionId: string) => {
  const bankDb = getBankDb(bankId);
  
  // Get admin data
  const admin = await bankDb.admin.findUnique({
    where: { id: adminId },
    select: { username: true, face_enrolled: true }
  });

  if (!admin) {
    throw new AppError('Admin not found', 404);
  }

  // Create access token
  const accessToken = jwt.sign(
    { 
      adminId,
      username: admin.username,
      bankId,
      faceEnrolled: admin.face_enrolled,
      sessionId,
      type: 'access'
    },
    process.env.JWT_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  // Create refresh token
  const refreshToken = jwt.sign(
    { 
      adminId,
      bankId,
      sessionId,
      type: 'refresh'
    },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  // Update refresh token in database
  await bankDb.session.update({
    where: { id: sessionId },
    data: { 
      refresh_token: refreshToken,
      last_activity: new Date()
    }
  });

  // Update in Redis
  await sessionManager.updateSession(sessionId, {
    lastActivity: new Date().toISOString()
  });

  return { accessToken, refreshToken };
};

// Set tokens in cookies
const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/'
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh'
  });
};

// Create new session
export const createSession = async (
  adminId: string,
  bankId: string,
  userAgent?: string,
  ipAddress?: string
) => {
  const bankDb = getBankDb(bankId);
  const sessionId = generateSessionId();

  // Create session in database
  const session = await bankDb.session.create({
    data: {
      id: sessionId,
      admin_id: adminId,
      bank_id: bankId,
      is_active: true,
      user_agent: userAgent,
      ip_address: ipAddress,
      created_at: new Date(),
      last_activity: new Date()
    }
  });

  // Create session in Redis
  await sessionManager.createSession(sessionId, {
    adminId,
    bankId,
    isActive: true,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    userAgent,
    ipAddress
  });

  // Create tokens
  const tokens = await generateNewTokens(adminId, bankId, sessionId);

  return { session, tokens };
};

// Destroy session
export const destroySession = async (sessionId: string, bankId: string) => {
  const bankDb = getBankDb(bankId);

  // Deactivate session in database
  await bankDb.session.update({
    where: { id: sessionId },
    data: { 
      is_active: false,
      ended_at: new Date()
    }
  });

  // Delete session from Redis
  await sessionManager.deleteSession(sessionId);
};

// Destroy all admin sessions
export const destroyAllAdminSessions = async (adminId: string, bankId: string) => {
  const bankDb = getBankDb(bankId);

  // Deactivate all sessions in database
  await bankDb.session.updateMany({
    where: { 
      admin_id: adminId,
      is_active: true 
    },
    data: { 
      is_active: false,
      ended_at: new Date()
    }
  });

  // Delete all admin sessions from Redis
  await sessionManager.deleteAllUserSessions(adminId, bankId);
};

/**
 * Generate cryptographically secure session ID
 * Format: sess_[timestamp]_[64-char-hex]
 */
const generateSessionId = (): string => {
  const randomBytes = crypto.randomBytes(32).toString('hex'); // 32 bytes = 64 hex chars
  const timestamp = Date.now().toString(36); // Base36 timestamp for compactness
  return `sess_${timestamp}_${randomBytes}`;
};

// Cleanup expired sessions
export const cleanupExpiredSessions = async () => {
  // Redis handles expired session cleanup automatically using TTL
  // This function is for manual cleanup if needed
  const count = await sessionManager.cleanupExpiredSessions();
  console.log(`ℹ️ Active sessions in Redis: ${count}`);
  return count;
};

export const requireBank = (bankId: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return next(new AppError('Authentication required', 401));
    }

    if (req.admin.bankId !== bankId) {
      return next(new AppError(`Access denied for bank: ${bankId}`, 403));
    }
    next();
  };
};

export const requireFaceEnrolled = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.admin) {
    return next(new AppError('Authentication required', 401));
  }

  if (!req.admin.faceEnrolled) {
    return next(new AppError('Face enrollment required', 403));
  }
  next();
};

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const isActive = await sessionManager.isSessionActive(decoded.sessionId);
      if (isActive) {
        await sessionManager.updateSession(decoded.sessionId, {
          lastActivity: new Date().toISOString()
        });
        req.admin = decoded;
      }
    }
    next();
  } catch (error: unknown) {
    // Continue without verification
    next();
  }
};
