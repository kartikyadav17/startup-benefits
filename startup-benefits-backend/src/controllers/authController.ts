import { Request, Response } from 'express';
import { generateToken, generateVerificationToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { UserOps, isUsingMemoryDB, setUsingMemoryDB } from '../utils/dbOps';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await UserOps.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Create new user
      const user = await UserOps.create({
        name,
        email,
        password,
      });

      // Auto-verify for demo
      const updatedUser = await UserOps.updateById((user as any)._id, {
        isVerified: true,
      });

      const token = generateToken((user as any)._id.toString());

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: (user as any)._id,
          name: user.name,
          email: user.email,
          isVerified: true,
        },
      });
    } catch (dbError: any) {
      // If MongoDB fails, use in-memory DB
      if (!isUsingMemoryDB()) {
        setUsingMemoryDB(true);
        console.log('Switched to in-memory database');

        const existingUser = await UserOps.findByEmail(email);
        if (existingUser) {
          res.status(400).json({ message: 'User already exists' });
          return;
        }

        const user = await UserOps.create({
          name,
          email,
          password,
        });

        const updatedUser = await UserOps.updateById((user as any)._id, {
          isVerified: true,
        });

        const token = generateToken((user as any)._id.toString());

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: (user as any)._id,
            name: user.name,
            email: user.email,
            isVerified: true,
          },
        });
        return;
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      // Find user and select password field
      const user = await UserOps.findByEmail(email);
      
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Compare passwords
      const isPasswordValid = await UserOps.comparePassword(user, password);
      
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = generateToken((user as any)._id.toString());

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: (user as any)._id,
          name: user.name,
          email: user.email,
          isVerified: (user as any).isVerified,
        },
      });
    } catch (dbError: any) {
      // If MongoDB fails, use in-memory DB
      if (!isUsingMemoryDB()) {
        setUsingMemoryDB(true);
        console.log('Switched to in-memory database');

        const user = await UserOps.findByEmail(email);
        
        if (!user) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        const isPasswordValid = await UserOps.comparePassword(user, password);
        
        if (!isPasswordValid) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        const token = generateToken((user as any)._id.toString());

        res.json({
          message: 'Login successful',
          token,
          user: {
            id: (user as any)._id,
            name: user.name,
            email: user.email,
            isVerified: (user as any).isVerified,
          },
        });
        return;
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await UserOps.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: (user as any)._id,
        name: user.name,
        email: user.email,
        company: (user as any).company,
        website: (user as any).website,
        isVerified: (user as any).isVerified,
      },
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { name, company, website } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const updatedUser = await UserOps.updateById(userId, { name, company, website });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: (updatedUser as any)._id,
        name: updatedUser.name,
        email: updatedUser.email,
        company: (updatedUser as any).company,
        website: (updatedUser as any).website,
      },
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await UserOps.findByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await UserOps.updateById((user as any)._id, { isVerified: true });

    res.json({ message: 'Email verified successfully' });
  } catch (error: any) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Verification failed' });
  }
};
