// Filename: src/controllers/kycController.ts
import { Request, Response } from 'express';
import { kycService } from '../services/kycService.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, schemas } from '../middleware/validation.js';
import { z } from 'zod';

/**
 * Local Request augmentation used in this file to avoid implicit-any and
 * to keep changes isolated (does not modify global Express types).
 */
interface AdminRequest extends Request {
  admin?: {
    adminId?: string;
    bankId?: string;
    [key: string]: any;
  };
}

/* ----------------------------
   Validation schemas (kept same semantics)
   ---------------------------- */
const lookupSchema = z.object({
  body: z.object({
    nni: schemas.nni
  })
});

const createKycSchema = z.object({
  body: z.object({
    masked_nni: z.string().min(1, 'Masked NNI is required'),
    payload_summary: z.record(z.any()),
    images: z.array(z.string()).optional().default([]),
    bankId: schemas.bankId
  })
});

const statusSchema = z.object({
  params: z.object({
    requestId: schemas.uuid
  }),
  query: z.object({
    bankId: schemas.bankId
  })
});

/* ----------------------------
   Controller
   ---------------------------- */
export const kycController = {
  lookup: [
    validateRequest(lookupSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as { nni: string };
      const { nni } = body;

      const result = await kycService.lookupCitizen(nni);

      if (!result?.found) {
        throw new AppError('NNI not found. Please verify your number.', 404);
      }

      res.json({
        success: true,
        ...result
      });
    })
  ],

  create: [
    validateRequest(createKycSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const body = req.body as {
        masked_nni: string;
        payload_summary: Record<string, any>;
        images?: string[];
        bankId: string;
      };

      const { masked_nni, payload_summary, images = [], bankId } = body;

      const result = await kycService.createKycRequest({
        masked_nni,
        payload_summary,
        images,
        bankId
      });

      res.status(201).json({
        success: true,
        ...result
      });
    })
  ],

  getStatus: [
    validateRequest(statusSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const params = req.params as { requestId: string };
      const q = req.query as Record<string, any>;
      const { requestId } = params;
      const bankId = String(q.bankId);

      const result = await kycService.getRequestStatus(requestId, bankId);

      if (!result) {
        throw new AppError('KYC request not found', 404);
      }

      res.json({
        success: true,
        ...result
      });
    })
  ],

  finalize: asyncHandler(async (req: Request, res: Response) => {
    const params = req.params as { requestId?: string; bankId?: string };
    const { requestId, bankId } = params;

    if (!requestId || !bankId) {
      throw new AppError('requestId and bankId are required', 400);
    }

    const result = await kycService.finalizeRequest(requestId, bankId);

    res.json({
      success: true,
      ...result
    });
  })
};

