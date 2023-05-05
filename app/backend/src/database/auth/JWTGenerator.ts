import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUser';

const tokenKey = 'Sk2398MpOL92';

export const secret = process.env.JWT_SECRET || tokenKey;

export const tokenGenerator = (email: IUserLogin) => jwt.sign(email, secret, {
  algorithm: 'HS256',
});

export const verifyToken = (token: string) => jwt.verify(token, secret);
