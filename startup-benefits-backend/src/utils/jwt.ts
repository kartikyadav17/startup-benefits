import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export const generateVerificationToken = (): { token: string; expiry: Date } => {
  const token = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  return { token, expiry };
};
