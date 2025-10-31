// Filename: src/controllers/adminController.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { getBankDb } from '../lib/database.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { kycService } from '../services/kycService.js';
import { validateRequest, schemas } from '../middleware/validation.js';
import { z } from 'zod';

/**
 * Local augmentation type for Request that includes `admin`.
 * We keep it minimal to avoid touching global declarations in this change.
 */
interface AdminInfo {
  adminId?: string;
}
interface AdminRequest extends Request {
  admin?: AdminInfo;
}

/* ----------------------------
   Validation schemas (unchanged logic)
   ---------------------------- */
const voteSchema = z.object({
  params: z.object({
    bankId: schemas.bankId,
    requestId: schemas.uuid
  }),
  body: z.object({
    vote: schemas.vote,
    reason: z.string().optional()
  })
});

const requestsSchema = z.object({
  params: z.object({
    bankId: schemas.bankId
  }),
  query: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
    // keep the schema intent; validation middleware is expected to coerce/validate,
    // but in the controller we still defensively coerce to numbers for TS safety.
    page: z.string().transform(Number).pipe(z.number().int().positive()).optional().default('1'),
    limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional().default('10')
  })
});

/* ----------------------------
   Controller
   ---------------------------- */
export const adminController = {
  getDashboard: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { bankId } = req.params;
    const bankDb = getBankDb(bankId);

    const [
      pendingCount,
      approvedCount,
      rejectedCount,
      totalUsers,
      recentRequests
    ] = await Promise.all([
      (bankDb.pendingRequest.count as any)({ where: { status: 'PENDING' } }),
      (bankDb.pendingRequest.count as any)({ where: { status: 'APPROVED' } }),
      (bankDb.pendingRequest.count as any)({ where: { status: 'REJECTED' } }),
      (bankDb.user.count as any)(),
      (bankDb.pendingRequest.findMany as any)({
        where: { status: 'PENDING' },
        include: {
          votes: {
            select: {
              bankId: true,
              vote: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        take: 5
      })
    ]);

    const voteDistribution = await (bankDb.vote.groupBy as any)({
      by: ['vote'],
      _count: {
        vote: true
      },
      where: {
        bankId
      }
    });

    res.json({
      success: true,
      stats: {
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        totalUsers,
        totalRequests: pendingCount + approvedCount + rejectedCount
      },
      voteDistribution,
      recentActivity: (recentRequests as any[]).map(r => ({
        id: r.id,
        masked_nni: r.masked_nni,
        status: r.status,
        created_at: r.created_at,
        voteCount: Array.isArray(r.votes) ? r.votes.length : 0,
        approvedCount: Array.isArray(r.votes) ? r.votes.filter((v: any) => v.vote === 'APPROVE').length : 0,
        rejectedCount: Array.isArray(r.votes) ? r.votes.filter((v: any) => v.vote === 'REJECT').length : 0
      }))
    });
  }),

  vote: [
    validateRequest(voteSchema),
    asyncHandler(async (req: AdminRequest, res: Response) => {
      const { bankId, requestId } = req.params;
      const { vote, reason } = req.body as { vote: string; reason?: string };

      const adminId = req.admin?.adminId;
      if (!adminId) {
        throw new AppError('Authentication required', 401);
      }

      const bankDb = getBankDb(bankId);

      // Check if already voted
      const existingVote = await (bankDb.vote.findUnique as any)({
        where: {
          requestId_bankId_adminId: {
            requestId,
            bankId,
            adminId
          }
        }
      });

      if (existingVote) {
        throw new AppError('You have already voted on this request', 400);
      }

      // Create vote
      const newVote = await (bankDb.vote.create as any)({
        data: {
          requestId,
          bankId,
          adminId,
          vote,
          reason: vote === 'REJECT' ? reason : undefined
        }
      });

      // Finalize request if this vote causes a decision
      const finalizeResult = await kycService.finalizeRequest(requestId, bankId);

      // Log audit event
      await (bankDb.auditLog.create as any)({
        data: {
          event_type: 'VOTE_CAST',
          meta_hash: crypto.createHash('sha256').update(String(requestId) + String(adminId)).digest('hex'),
          details: {
            requestId,
            adminId,
            vote,
            reason,
            finalStatus: finalizeResult?.newStatus
          }
        }
      });

      res.json({
        success: true,
        vote: newVote,
        finalStatus: finalizeResult?.newStatus,
        message: 'Vote submitted successfully'
      });
    })
  ],

  getRequests: [
    validateRequest(requestsSchema),
    asyncHandler(async (req: AdminRequest, res: Response) => {
      const { bankId } = req.params;
      // req.query is not strongly typed here; coerce defensively
      const q = req.query as Record<string, any>;
      const status = q.status as string | undefined;
      const page = Number(q.page ?? 1);
      const limit = Number(q.limit ?? 10);

      const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
      const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 10;

      const bankDb = getBankDb(bankId);

      const where = status ? { status } : {};
      const skip = (safePage - 1) * safeLimit;

      const [requests, total] = await Promise.all([
        (bankDb.pendingRequest.findMany as any)({
          where,
          include: {
            votes: {
              select: {
                bankId: true,
                vote: true,
                createdAt: true,
                admin: {
                  select: {
                    username: true
                  }
                }
              }
            }
          },
          skip,
          take: safeLimit,
          orderBy: { created_at: 'desc' }
        }),
        (bankDb.pendingRequest.count as any)({ where })
      ]);

      const pages = safeLimit > 0 ? Math.ceil(total / safeLimit) : 1;

      res.json({
        success: true,
        requests: (requests as any[]).map(r => ({
          ...r,
          voteSummary: {
            total: Array.isArray(r.votes) ? r.votes.length : 0,
            approved: Array.isArray(r.votes) ? r.votes.filter((v: any) => v.vote === 'APPROVE').length : 0,
            rejected: Array.isArray(r.votes) ? r.votes.filter((v: any) => v.vote === 'REJECT').length : 0
          }
        })),
        pagination: {
          page: safePage,
          limit: safeLimit,
          total,
          pages,
          hasNext: safePage < pages,
          hasPrev: safePage > 1
        }
      });
    })
  ],

  getRequestDetails: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { bankId, requestId } = req.params;

    const bankDb = getBankDb(bankId);

    const request = await (bankDb.pendingRequest.findUnique as any)({
      where: { id: requestId },
      include: {
        votes: {
          include: {
            admin: {
              select: {
                username: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        hederaProofs: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    });

    if (!request) {
      throw new AppError('Request not found', 404);
    }

    res.json({
      success: true,
      request: {
        ...request,
        voteSummary: {
          total: Array.isArray(request.votes) ? request.votes.length : 0,
          approved: Array.isArray(request.votes) ? request.votes.filter((v: any) => v.vote === 'APPROVE').length : 0,
          rejected: Array.isArray(request.votes) ? request.votes.filter((v: any) => v.vote === 'REJECT').length : 0,
          // assumes 5 banks total (kept from original logic)
          pending: Math.max(0, 5 - (Array.isArray(request.votes) ? request.votes.length : 0))
        }
      }
    });
  })
};

