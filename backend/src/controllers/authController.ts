// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getBankDb } from '../lib/database.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import {
  authMiddleware,
  createSession,
  destroySession,
  destroyAllAdminSessions
} from '../middleware/auth.js';
import { faceService } from '../services/faceService.js';
import { encrypt } from '../lib/crypto.js';

interface AdminRequest extends Request {
  admin?: {
    adminId?: string;
    bankId?: string;
    sessionId?: string;
    [key: string]: any;
  };
}

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const { username, password, bankId } = req.body;

    if (!username || !password || !bankId) {
      throw new AppError('Username, password, and bankId are required', 400);
    }

    const bankDb = getBankDb(bankId);
    const admin = await (bankDb.admin.findUnique as any)({
      where: { username }
    });

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      throw new AppError('Invalid username or password', 401);
    }

    // إنشاء جلسة جديدة
    const { session, tokens } = await createSession(admin.id, bankId);

    // تحديث آخر دخول
    await (bankDb.admin.update as any)({
      where: { id: admin.id },
      data: { last_login: new Date() }
    });

    // تسجيل حدث التدقيق
    await (bankDb.auditLog.create as any)({
      data: {
        event_type: 'ADMIN_LOGIN',
        meta_hash: crypto.createHash('sha256').update(String(session.id)).digest('hex'),
        details: {
          adminId: admin.id,
          sessionId: session.id,
          userAgent: req.get('User-Agent') || 'unknown',
          ipAddress: req.ip
        }
      }
    });

    res.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        bankId: admin.bank_id,
        faceEnrolled: admin.face_enrolled
      },
      session: {
        id: session.id,
        createdAt: session.created_at
      }
    });
  }),

  logout: asyncHandler(async (req: AdminRequest, res: Response) => {
    const sessionId = req.admin?.sessionId;
    const bankId = req.admin?.bankId;

    if (sessionId && bankId) {
      await destroySession(sessionId, bankId);
    }

    // مسح الـ cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }),

  logoutAll: asyncHandler(async (req: AdminRequest, res: Response) => {
    const adminId = req.admin?.adminId;
    const bankId = req.admin?.bankId;

    if (adminId && bankId) {
      await destroyAllAdminSessions(adminId, bankId);
    }

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.json({
      success: true,
      message: 'Logged out from all devices'
    });
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'Token refresh handled automatically'
    });
  }),

  getMe: asyncHandler(async (req: AdminRequest, res: Response) => {
    res.json({
      success: true,
      admin: req.admin || null
    });
  }),

  getSessions: asyncHandler(async (req: AdminRequest, res: Response) => {
    const adminId = req.admin?.adminId;
    const bankId = req.admin?.bankId;

    if (!adminId || !bankId) {
      throw new AppError('Authentication required', 401);
    }

    const bankDb = getBankDb(bankId);
    const sessions = await (bankDb.session.findMany as any)({
      where: { adminId },
      orderBy: { last_activity: 'desc' },
      select: {
        id: true,
        user_agent: true,
        ip_address: true,
        created_at: true,
        last_activity: true,
        is_active: true
      }
    });

    res.json({
      success: true,
      sessions
    });
  }),

  revokeSession: asyncHandler(async (req: AdminRequest, res: Response) => {
    const adminId = req.admin?.adminId;
    const bankId = req.admin?.bankId;
    const { sessionId } = req.params;

    if (!adminId || !bankId) {
      throw new AppError('Authentication required', 401);
    }

    if (!sessionId) {
      throw new AppError('sessionId is required', 400);
    }

    const bankDb = getBankDb(bankId);

    // التحقق من أن الجلسة تخص المسؤول الحالي
    const session = await (bankDb.session.findFirst as any)({
      where: {
        id: sessionId,
        adminId,
        is_active: true
      }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    await destroySession(sessionId, bankId);

    res.json({
      success: true,
      message: 'Session revoked successfully'
    });
  }),

  enrollFace: asyncHandler(async (req: Request, res: Response) => {
    const { bankId } = req.params;
    const { adminId, embeddings } = req.body;

    if (!bankId) {
      throw new AppError('bankId is required', 400);
    }

    if (!adminId) {
      throw new AppError('adminId is required', 400);
    }

    if (!embeddings || !Array.isArray(embeddings) || embeddings.length === 0) {
      throw new AppError('Face embeddings are required', 400);
    }

    // Convert number arrays to FaceEmbedding format
    const faceEmbeddings = embeddings.map((embedding: number[] | number[][]) => {
      const embeddingString = JSON.stringify(embedding);
      const encrypted = encrypt(embeddingString);
      
      return faceService.convertToFaceEmbedding(embedding, encrypted);
    });

    await faceService.enrollFace(adminId, bankId, faceEmbeddings);

    res.json({
      success: true,
      message: 'Face enrolled successfully',
      embeddingsCount: embeddings.length
    });
  }),

  verifyFace: asyncHandler(async (req: Request, res: Response) => {
    const { bankId } = req.params;
    const { adminId, probeEmbedding } = req.body;

    if (!bankId) {
      throw new AppError('bankId is required', 400);
    }

    if (!adminId) {
      throw new AppError('adminId is required', 400);
    }

    if (!probeEmbedding) {
      throw new AppError('Probe embedding is required', 400);
    }

    // Convert probe embedding to FaceEmbedding format
    const embeddingString = JSON.stringify(probeEmbedding);
    const encrypted = encrypt(embeddingString);
    const faceEmbedding = faceService.convertToFaceEmbedding(probeEmbedding, encrypted);

    const result = await faceService.verifyFace(adminId, bankId, faceEmbedding);

    if (result.match) {
      // إنشاء جلسة جديدة للتحقق بالوجه
      await createSession(adminId, bankId);
    }

    res.json({
      success: true,
      ...result
    });
  })
};
