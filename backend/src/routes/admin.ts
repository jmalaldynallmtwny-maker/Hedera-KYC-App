import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authMiddleware, requireBank } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication and bank authorization
router.use('/:bankId', authMiddleware, requireBank('baybank'));

// Dashboard and requests
router.get('/:bankId/dashboard', adminController.getDashboard);
router.get('/:bankId/requests', adminController.getRequests);
router.get('/:bankId/requests/:requestId', adminController.getRequestDetails);

// Voting
router.post('/:bankId/review/:requestId/vote', adminController.vote);

export default router;
