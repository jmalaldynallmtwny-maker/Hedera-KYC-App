import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { decryptStatusToken } from '../lib/crypto.js';
import { kycService } from '../services/kycService.js';

const router = Router();

router.get('/:token', asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    // Decrypt and validate the status token
    const { requestId, bankId, exp } = decryptStatusToken(token);

    // Check if token is expired
    if (new Date(exp) < new Date()) {
      return res.status(410).json({
        success: false,
        error: 'TOKEN_EXPIRED',
        message: 'Status link has expired. Please request a new link from the bank.'
      });
    }

    // Get request status
    const status = await kycService.getRequestStatus(requestId, bankId);

    if (!status) {
      return res.status(404).json({
        success: false,
        error: 'REQUEST_NOT_FOUND',
        message: 'KYC request not found or no longer available.'
      });
    }

    res.json({
      success: true,
      ...status,
      tokenValid: true
    });

  } catch (error) {
    console.error('Status token error:', error);
    res.status(400).json({
      success: false,
      error: 'INVALID_TOKEN',
      message: 'Invalid or corrupted status token.'
    });
  }
}));

export default router;
