import { findAllTeams } from './Team.service';
import { totalPoins, totalDraws, totalWins, totalLoses,
  totalGames, goalsFavor, goalsOwn } from '../utils/leaderboardHome.utils';

export const leaderBoardFormat = async () => {
  const find = await findAllTeams();
  const result = Promise.all(find.map(async (team) => ({
    name: team.teamName,
    totalPoints: await totalPoins(team.id),
    totalGames: await totalGames(team.id),
    totalVictories: await totalWins(team.id),
    totalDraws: await totalDraws(team.id),
    totalLosses: await totalLoses(team.id),
    goalsFavor: await goalsFavor(team.id),
    goalsOwn: await goalsOwn(team.id),
    goalsBalance: await goalsFavor(team.id) - await goalsOwn(team.id),
    efficiency: parseFloat(((await totalPoins(team.id) / (await totalGames(team.id) * 3)) * 100)
      .toFixed(2)),
  })));
  return result;
};

export const orderLeaderBoardHome = async () => {
  const board = await leaderBoardFormat();
  return board.sort((a, b) => {
    switch (true) {
      case (b.totalPoints !== a.totalPoints):
        return b.totalPoints - a.totalPoints;
      case (b.totalVictories !== a.totalVictories):
        return b.totalVictories - a.totalVictories;
      case (b.goalsBalance !== a.goalsBalance):
        return (b.goalsBalance - a.goalsBalance);
      default:
        return b.goalsFavor - a.goalsFavor;
    }
  });
};
