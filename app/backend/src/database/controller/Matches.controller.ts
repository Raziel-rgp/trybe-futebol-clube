import { Request, Response } from 'express';
import { findAllMatches, findAllByBool,
  finishMatch, updateMatchSer, createMatchSer } from '../service/Matches.service';

export const findAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  let matches;
  switch (inProgress) {
    case 'true':
      matches = await findAllByBool(true);
      break;
    case 'false':
      matches = await findAllByBool(false);
      break;
    default:
      matches = await findAllMatches();
      break;
  }
  return res.status(200).json(matches);
};

export const endMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await finishMatch(id);
  return res.status(200).json({ message: 'Finished' });
};

export const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const result = await updateMatchSer(id, homeTeamGoals, awayTeamGoals);
  return res.status(200).json(result);
};

export const creatNewMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals,
    awayTeamGoals,
    homeTeamId,
    awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  const { status, message } = await createMatchSer(
    homeTeamGoals,
    awayTeamGoals,
    homeTeamId,
    awayTeamId,
  );
  return res.status(status).json({ message });
};
