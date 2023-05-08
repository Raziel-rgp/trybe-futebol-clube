import { Request, Response } from 'express';
import { orderLeaderBoardHome } from '../service/LeaderboardHome.service';
import { orderLeaderBoardAway } from '../service/LeaderboardAway.service';
import { orderLeaderBoard } from '../service/Leaderboard.service';

export const logAllHome = async (_req: Request, res: Response) => {
  const result = await orderLeaderBoardHome();
  return res.status(200).json(result);
};

export const logAllAway = async (_req: Request, res: Response) => {
  const result = await orderLeaderBoardAway();
  return res.status(200).json(result);
};

export const logAll = async (_req: Request, res: Response) => {
  const result = await orderLeaderBoard();
  return res.status(200).json(result);
};
