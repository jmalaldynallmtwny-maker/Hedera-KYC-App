// backend/src/routes/hedera.ts
import { Router, Request, Response } from 'express';
import { hederaService } from '../services/hederaService.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getBankDb } from '../lib/database.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/status', asyncHandler(async (req: Request, res: Response) => {
    const status = await hederaService.getServiceStatus();
    res.json({
        success: true,
        ...status
    });
}));

router.get('/verify/:requestId', asyncHandler(async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { bankId } = req.query;

    if (!bankId || typeof bankId !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'bankId query parameter is required'
        });
    }

    const result = await hederaService.verifyProof(requestId, bankId);
    
    res.json({
        success: true,
        ...result
    });
}));

router.get('/proofs/:requestId', asyncHandler(async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { bankId } = req.query;

    if (!bankId || typeof bankId !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'bankId query parameter is required'
        });
    }

    const bankDb = getBankDb(bankId);
    const proof = await (bankDb.hederaProof.findFirst as any)({
        where: { request_id: requestId }
    });

    if (!proof) {
        return res.status(404).json({
            success: false,
            error: 'Proof not found'
        });
    }

    res.json({
        success: true,
        proof: {
            requestId: proof.request_id,
            summaryHash: proof.summary_hash,
            topicMessageId: proof.topic_message_id,
            publishedAt: proof.created_at
        }
    });
}));

export default router;
