import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { nl2sqlService } from '../services/nl2sqlService.js';

const router = Router();

router.post('/query', asyncHandler(async (req: Request, res: Response) => {
  const { mode, text, context } = req.body;

  if (!mode || !text) {
    return res.status(400).json({
      success: false,
      error: 'mode and text are required'
    });
  }

  try {
    const result = await nl2sqlService.processQuery({
      text,
      mode,
      context
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('LLM query error:', error);
    res.status(500).json({
      success: false,
      action: 'ERROR',
      message: error.message || 'LLM query failed'
    });
  }
}));

router.get('/suggestions/:bankId', asyncHandler(async (req: Request, res: Response) => {
  const { bankId } = req.params;
  
  const suggestions = await nl2sqlService.getQuerySuggestions(bankId);
  
  res.json({
    success: true,
    suggestions
  });
}));

export default router;
