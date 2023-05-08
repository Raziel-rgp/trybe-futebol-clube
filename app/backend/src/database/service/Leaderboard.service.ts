import { findAllTeams } from './Team.service';
import { totalPoins, totalDraws, totalWins, totalLoses,
  totalGames, goalsFavor, goalsOwn } from '../utils/leaderboard.utils';

const leaderBoardFormat = async () => {
  const find = await findAllTeams();
  const result = Promise.all(find.map(async (team) => {
    const { id, teamName } = team;
    return {
      name: teamName,
      totalPoints: await totalPoins(id),
      totalGames: await totalGames(id),
      totalVictories: await totalWins(id),
      totalDraws: await totalDraws(id),
      totalLosses: await totalLoses(id),
      goalsFavor: await goalsFavor(id),
      goalsOwn: await goalsOwn(id),
      goalsBalance: await goalsFavor(id) - await goalsOwn(id),
    };
  }));
  return result;
};

export default leaderBoardFormat;
