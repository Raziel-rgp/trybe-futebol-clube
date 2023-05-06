import { Request, Response } from 'express';
import TeamService from '../service/Team.service';

export const findAll = async (_req: Request, res: Response) => {
  try {
    const teams = await TeamService.findAllTeams();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await TeamService.findTeamById(id);
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json(error);
  }
};
