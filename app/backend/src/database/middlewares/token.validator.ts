import { Request, Response, NextFunction } from 'express';
import { findOEmail } from '../service/Login.service';
import { verifyToken } from '../auth/JWTGenerator';

require('dotenv/config');

export const tokenValidator = async (req: Request, res: Response) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const email = verifyToken(token);
    const user = await findOEmail(email as string);
    return res.status(200).json({ role: user?.role });
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const email = verifyToken(token);
    const user = await findOEmail(email as string);
    if (!user) {
      return res.status(401).json({ message: 'Error to find the token owner' });
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
