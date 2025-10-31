import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware, requireBank } from '../middleware/auth.js';

const router = Router();

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

router.use(authMiddleware);

router.get('/me', authController.getMe);
router.get('/sessions', authController.getSessions);
router.post('/logout-all', authController.logoutAll);
router.delete('/sessions/:sessionId', authController.revokeSession);
router.post('/:bankId/enroll-face', requireBank('baybank'), authController.enrollFace);
router.post('/:bankId/verify-face', authController.verifyFace);

export default router;
