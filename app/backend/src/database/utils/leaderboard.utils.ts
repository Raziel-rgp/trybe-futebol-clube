/* eslint-disable @typescript-eslint/no-explicit-any */
import Matches from '../models/Matches.model';

export const allMatchesHome = async (id: number): Promise<any> =>
  Matches.findAll({ where: { homeTeamId: id, inProgress: false } });

export const allMatchesAway = async (id: number): Promise<any> =>
  Matches.findAll({ where: { awayTeamId: id, inProgress: false } });

const funcFilter = async (id: number, filterFunc: (match: any) => boolean): Promise<number> => {
  const matchesHome = await allMatchesHome(id);

  const filteredHome = matchesHome.filter(filterFunc);

  return filteredHome.length;
};

const funcFilter2 = async (id: number, filterFunc: (match: any) => boolean): Promise<number> => {
  const matchesAway = await allMatchesAway(id);

  const filteredAway = matchesAway.filter(filterFunc);

  return filteredAway.length;
};

export const totalPoins = async (id: number): Promise<number> => {
  const homeWins = await funcFilter(id, (match: any) => match.homeTeamGoals > match.awayTeamGoals);
  const awayWins = await funcFilter2(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);
  const draws1 = await funcFilter(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);
  const draw2 = await funcFilter2(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals)
  const draw = draws1 + draw2;
  return (homeWins + awayWins) * 3 + draw;
};

export const totalWins = async (id: number): Promise<number> => {
  const homeWins = await funcFilter(id, (match: any) => match.homeTeamGoals > match.awayTeamGoals);
  const awayWins = await funcFilter2(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);

  return homeWins + awayWins;
};

export const totalDraws = async (id: number): Promise<number> => {
  const draw = await funcFilter(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);
  const draw2 = await funcFilter2(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);
  return draw + draw2;
};

export const totalLoses = async (id: number): Promise<number> => {
  const homeLoses = await funcFilter(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);
  const awayLoses = await funcFilter2(id, (match: any) =>
    match.homeTeamGoals > match.awayTeamGoals);
  return homeLoses + awayLoses;
};

export const totalGames = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesHome(id);
  const matchesAway = await allMatchesAway(id);

  return matchesHome.length + matchesAway.length;
};

export const goalsFavor = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesHome(id);
  const matchesAway = await allMatchesAway(id);

  const homeGoals = matchesHome.map((match: { homeTeamGoals: any; }) => match.homeTeamGoals);
  const awayGoals = matchesAway.map((match: { awayTeamGoals: any; }) => match.awayTeamGoals);

  return homeGoals.reduce((acc: number, cur: number) =>
    acc + cur, 0) + awayGoals.reduce((acc: number, cur: number) => acc + cur, 0);
};

export const goalsOwn = async (id: number): Promise<number> => {
  const matchesHome = await allMatchesHome(id);
  const matchesAway = await allMatchesAway(id);

  const homeGoals = matchesHome.map((match: { awayTeamGoals: any; }) => match.awayTeamGoals);
  const awayGoals = matchesAway.map((match: { homeTeamGoals: any; }) => match.homeTeamGoals);

  return homeGoals.reduce((acc: number, cur: number) =>
    acc + cur, 0) + awayGoals.reduce((acc: number, cur: number) => acc + cur, 0);
};
