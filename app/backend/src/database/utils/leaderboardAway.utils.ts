/* eslint-disable @typescript-eslint/no-explicit-any */
import Matches from '../models/Matches.model';

export const allMatchesAway = async (id: number): Promise<any> =>
  Matches.findAll({ where: { awayTeamId: id, inProgress: false } });

const funcFilter2 = async (id: number, filterFunc: (match: any) => boolean): Promise<number> => {
  const matchesAway = await allMatchesAway(id);

  const filteredAway = matchesAway.filter(filterFunc);

  return filteredAway.length;
};

export const totalPoins = async (id: number): Promise<number> => {
  const homeWins = await funcFilter2(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);
  const draws = await funcFilter2(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);

  return (homeWins) * 3 + draws;
};

export const totalWins = async (id: number): Promise<number> => {
  const homeWins = await funcFilter2(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);

  return homeWins;
};

export const totalDraws = async (id: number): Promise<number> =>
  funcFilter2(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);

export const totalLoses = async (id: number): Promise<number> => {
  const homeLoses = await funcFilter2(id, (match: any) =>
    match.homeTeamGoals > match.awayTeamGoals);
  return homeLoses;
};

export const totalGames = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesAway(id);

  return matchesHome.length;
};

export const goalsFavor = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesAway(id);

  const homeGoals = matchesHome.map((match: { awayTeamGoals: any; }) => match.awayTeamGoals);

  return homeGoals.reduce((acc: number, cur: number) =>
    acc + cur, 0);
};

export const goalsOwn = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesAway(id);

  const homeGoals = matchesHome.map((match: { homeTeamGoals: any; }) => match.homeTeamGoals);

  return homeGoals.reduce((acc: number, cur: number) =>
    acc + cur, 0);
};
