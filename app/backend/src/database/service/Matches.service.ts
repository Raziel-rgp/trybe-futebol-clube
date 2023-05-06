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

export const finishMatch = async (id: string) => {
  const result = await Matches.update({ inProgress: false }, { where: { id: Number(id) } });
  return result;
};

export const updateMatchSer = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  const re = await Matches.update({ awayTeamGoals, homeTeamGoals }, { where: { id: Number(id) } });
  return re;
};

export const findMatchSer = async (id: number) => {
  const result = await Teams.findOne({ where: { id } });
  if (!result) return false;
  return true;
};

export const createMatchSer = async (
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeamId: number,
  awayTeamId: number,
) => {
  const existHome = await findMatchSer(homeTeamId);
  const existAway = await findMatchSer(awayTeamId);
  if (existHome === false || existAway === false) {
    return { status: 404, message: 'There is no team with such id!' };
  }
  const newMatch = await Matches.create({
    homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId, inProgress: true });
  return { status: 201, message: newMatch };
};
