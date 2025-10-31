// backend/src/routes/export.ts
import { Router } from 'express';
import { exportController } from '../controllers/exportController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// All export routes require authentication
router.use(authMiddleware);

// Export routes
router.post('/:bankId/generate', exportController.generateExport);
router.post('/:bankId/report', exportController.generateReport);
router.get('/:bankId/formats', exportController.getExportFormats);
router.get('/:bankId/history', exportController.getExportHistory);

export default router;
