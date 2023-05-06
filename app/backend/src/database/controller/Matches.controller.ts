import { Request, Response } from 'express';
import { findAllMatches, findAllByBool } from '../service/Matches.service';

const findAll = async (req: Request, res: Response) => {
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

export default findAll;
