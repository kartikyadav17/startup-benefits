import { Router } from 'express';
import {
  claimDeal,
  getUserClaims,
  getClaimById,
  getClaimStatus,
  approveClaim,
  rejectClaim,
} from '../controllers/claimController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Protected routes
router.post('/', authenticate, claimDeal);
router.get('/user/claims', authenticate, getUserClaims);
router.get('/status/:dealId', authenticate, getClaimStatus);
router.get('/:id', authenticate, getClaimById);
router.patch('/:id/approve', authenticate, approveClaim);
router.patch('/:id/reject', authenticate, rejectClaim);

export default router;
