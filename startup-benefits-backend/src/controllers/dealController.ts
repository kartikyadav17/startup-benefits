import { Request, Response } from 'express';
import Deal, { IDeal } from '../models/Deal';
import { AuthRequest } from '../middleware/auth';
import { DealOps } from '../utils/dbOps';

export const getAllDeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, accessLevel } = req.query;

    const filters: any = {};
    if (category && category !== 'all') {
      filters.category = category;
    }
    if (accessLevel && accessLevel !== 'all') {
      filters.accessLevel = accessLevel;
    }
    if (search) {
      filters.search = search;
    }

    const deals = await DealOps.findAll(filters);

    res.status(200).json({
      count: deals.length,
      deals,
    });
  } catch (error: any) {
    console.error('Get deals error:', error);
    res.status(500).json({ message: 'Failed to fetch deals', error: error.message });
  }
};

export const getDealById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deal = await DealOps.findById(id);

    if (!deal) {
      res.status(404).json({ message: 'Deal not found' });
      return;
    }

    res.status(200).json({ deal });
  } catch (error: any) {
    console.error('Get deal error:', error);
    res.status(500).json({ message: 'Failed to fetch deal', error: error.message });
  }
};

export const createDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dealData = req.body;

    const deal = await DealOps.create(dealData);

    res.status(201).json({
      message: 'Deal created successfully',
      deal,
    });
  } catch (error: any) {
    console.error('Create deal error:', error);
    res.status(500).json({ message: 'Failed to create deal', error: error.message });
  }
};

export const updateDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const deal = await DealOps.updateById(id, updateData);

    if (!deal) {
      res.status(404).json({ message: 'Deal not found' });
      return;
    }

    res.status(200).json({
      message: 'Deal updated successfully',
      deal,
    });
  } catch (error: any) {
    console.error('Update deal error:', error);
    res.status(500).json({ message: 'Failed to update deal', error: error.message });
  }
};

export const deleteDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const success = await DealOps.deleteById(id);

    if (!success) {
      res.status(404).json({ message: 'Deal not found' });
      return;
    }

    res.status(200).json({
      message: 'Deal deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete deal error:', error);
    res.status(500).json({ message: 'Failed to delete deal', error: error.message });
  }
};
