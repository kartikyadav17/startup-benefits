import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser & { id: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Extend request with user data
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation error',
      errors: Object.values(err.errors).map((e: any) => e.message),
    });
    return;
  }

  if (err.code === 11000) {
    res.status(400).json({
      message: 'Duplicate field value',
      field: Object.keys(err.keyPattern)[0],
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
};
