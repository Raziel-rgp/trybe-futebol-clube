import { Sequelize, Op } from 'sequelize';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';

// creditos ao André Pestana Silva 25B

export const allMatchesLeader = async (id: string) => {
  const matches = await Matches.findAll({ where: { id: { [Op.eq]: id } } });
};

export const totalWins = async (id: number) => {
  const total = Matches.count({
    where: {
      homeTeamId: id,
      inProgress: false,
      homeTeamGoals: { [Op.gt]: Sequelize.col('away_team_goals') },
    },
  });
  return total;
};

export const totalDraws = async (id: number) => {
  const total = Matches.count({
    where: {
      homeTeamId: id,
      inProgress: false,
      homeTeamGoals: { [Op.eq]: Sequelize.col('away_team_goals') },
    },
  });
  return total;
};

export const totalLoses = async (id: number) => {
  const total = Matches.count({
    where: {
      homeTeamId: id,
      inProgress: false,
      homeTeamGoals: { [Op.lt]: Sequelize.col('away_team_goals') },
    },
  });
  return total;
};

export const leaderBoard = async (teams: Teams[]) => {
  Promise.all(teams.map(async ({ dataValues: { id, name, totalGames, goalsFavor, goalsOwn } }) => {
    const totalW = await totalWins(id);
    const totalD = await totalDraws(id);
    const totalL = await totalLoses(id);
    const totalP = (totalW * 3) + totalD;

    return {
      name,
      totalGames,
      totalW,
      totalD,
      totalL,
      totalP,
      efficiency: parseFloat(((totalP / (totalGames * 3)) * 100).toFixed(2)),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
    };
  }));
};
