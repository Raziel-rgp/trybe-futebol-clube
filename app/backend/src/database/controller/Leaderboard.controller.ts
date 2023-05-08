import { Request, Response } from 'express';
import leaderBoardFormat from '../service/Leaderboard.service';

export const logAll = async (_req: Request, res: Response) => {
  const sla = await leaderBoardFormat();
  return res.status(200).json(sla);
};

export const log = async (req: Request, res: Response) => res.status(200).json(req);
