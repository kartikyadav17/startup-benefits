import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ClaimOps, DealOps, UserOps } from '../utils/dbOps';

export const claimDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { dealId } = req.body;
    const userId = (req as any).user.id;

    // Check if deal exists
    const deal = await DealOps.findById(dealId);
    if (!deal) {
      res.status(404).json({ message: 'Deal not found' });
      return;
    }

    // Check if user already claimed this deal
    const existingClaim = await ClaimOps.findByUserAndDeal(userId, dealId);
    if (existingClaim) {
      res.status(400).json({ message: 'You have already claimed this deal' });
      return;
    }

    // If deal is restricted, check user verification
    if (deal.accessLevel === 'restricted') {
      const user = await UserOps.findById(userId);
      if (!user || !user.isVerified) {
        res.status(403).json({
          message: 'This deal requires email verification',
          requiresVerification: true,
        });
        return;
      }
    }

    // Create claim
    const claim = await ClaimOps.create({
      userId,
      dealId,
      status: 'approved',
      claimedAt: new Date(),
      approvedAt: new Date(),
    });

    res.status(201).json({
      message: 'Deal claimed successfully',
      claim,
    });
  } catch (error: any) {
    console.error('Claim deal error:', error);
    res.status(500).json({ message: 'Failed to claim deal', error: error.message });
  }
};

export const getUserClaims = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const claims = await ClaimOps.findByUserId(userId);

    res.status(200).json({
      count: claims.length,
      claims,
    });
  } catch (error: any) {
    console.error('Get user claims error:', error);
    res.status(500).json({ message: 'Failed to fetch claims', error: error.message });
  }
};

export const getClaimById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const claim = await ClaimOps.findById(id);

    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }

    // Check if user owns this claim
    if (claim.userId !== userId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({ claim });
  } catch (error: any) {
    console.error('Get claim error:', error);
    res.status(500).json({ message: 'Failed to fetch claim', error: error.message });
  }
};

export const getClaimStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { dealId } = req.params;
    const userId = (req as any).user.id;

    const claim = await ClaimOps.findByUserAndDeal(userId, dealId);

    if (!claim) {
      res.status(200).json({ claimed: false });
      return;
    }

    res.status(200).json({
      claimed: true,
      status: claim.status,
      claimedAt: claim.claimedAt,
      claim,
    });
  } catch (error: any) {
    console.error('Get claim status error:', error);
    res.status(500).json({ message: 'Failed to fetch claim status', error: error.message });
  }
};

export const approveClaim = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const claim = await ClaimOps.updateById(id, {
      status: 'approved',
      approvedAt: new Date(),
    });

    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }

    res.status(200).json({
      message: 'Claim approved',
      claim,
    });
  } catch (error: any) {
    console.error('Approve claim error:', error);
    res.status(500).json({ message: 'Failed to approve claim', error: error.message });
  }
};

export const rejectClaim = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const claim = await ClaimOps.updateById(id, {
      status: 'rejected',
      rejectionReason: reason,
    });

    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }

    res.status(200).json({
      message: 'Claim rejected',
      claim,
    });
  } catch (error: any) {
    console.error('Reject claim error:', error);
    res.status(500).json({ message: 'Failed to reject claim', error: error.message });
  }
};
