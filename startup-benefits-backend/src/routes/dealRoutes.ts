import { Router } from 'express';
import {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} from '../controllers/dealController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllDeals);
router.get('/:id', getDealById);

// Protected routes (admin)
router.post('/', authenticate, createDeal);
router.put('/:id', authenticate, updateDeal);
router.delete('/:id', authenticate, deleteDeal);

export default router;
