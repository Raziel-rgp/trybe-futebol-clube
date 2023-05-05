import { Request, Response, NextFunction } from 'express';
import { findOEmail } from '../service/Login.service';
import { verifyToken } from '../auth/JWTGenerator';

require('dotenv/config');

const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const email = verifyToken(token);
    const user = await findOEmail(email as string);
    return res.status(200).json({ role: user?.role });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidator;
