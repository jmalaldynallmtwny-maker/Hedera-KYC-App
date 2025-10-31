import { Router } from 'express';
import { kycController } from '../controllers/kycController.js';

const router = Router();

// Public routes
router.post('/lookup', kycController.lookup);
router.post('/', kycController.create);
router.get('/:requestId', kycController.getStatus);

export default router;
