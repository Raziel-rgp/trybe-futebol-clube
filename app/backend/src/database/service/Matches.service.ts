import Teams from '../models/Teams.model';
import Matches from '../models/Matches.model';

export const findAllMatches = async () => {
  const allMatches = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam' },
      { model: Teams, as: 'awayTeam' },
    ],
  });
  return allMatches;
};

export const findAllByBool = async (progress: boolean) => {
  const findBool = await Matches.findAll({
    where: { inProgress: progress },
    include: [
      { model: Teams, as: 'homeTeam' },
      { model: Teams, as: 'awayTeam' },
    ],
  });
  return findBool;
};
