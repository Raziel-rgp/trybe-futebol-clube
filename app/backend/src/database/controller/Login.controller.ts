import { Request, Response } from 'express';
import LoginService from '../service/Login.service';

const findAll = async (_req: Request, res: Response) => {
  try {
    const users = await LoginService.findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { findAll };
