/* eslint-disable @typescript-eslint/no-explicit-any */
import Matches from '../models/Matches.model';

export const allMatchesHome = async (id: number): Promise<any> =>
  Matches.findAll({ where: { homeTeamId: id, inProgress: false } });

export const allMatchesAway = async (id: number): Promise<any> =>
  Matches.findAll({ where: { awayTeamId: id, inProgress: false } });

const getTotal = async (id: number, filterFunc: (match: any) => boolean): Promise<number> => {
  const matchesHome = await allMatchesHome(id);
  const matchesAway = await allMatchesAway(id);

  const filteredHome = matchesHome.filter(filterFunc);
  const filteredAway = matchesAway.filter(filterFunc);

  return filteredHome.length + filteredAway.length;
};

export const totalPoins = async (id: number): Promise<number> => {
  const homeWins = await getTotal(id, (match: any) => match.homeTeamGoals > match.awayTeamGoals);
  const awayWins = await getTotal(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);
  const draws = await getTotal(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);

  return (homeWins + awayWins) * 3 + draws;
};

export const totalWins = async (id: number): Promise<number> => {
  const homeWins = await getTotal(id, (match: any) => match.homeTeamGoals > match.awayTeamGoals);
  const awayWins = await getTotal(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);

  return homeWins + awayWins;
};

export const totalDraws = async (id: number): Promise<number> =>
  getTotal(id, (match: any) => match.homeTeamGoals === match.awayTeamGoals);

export const totalLoses = async (id: number): Promise<number> => {
  const homeLoses = await getTotal(id, (match: any) => match.homeTeamGoals < match.awayTeamGoals);
  const awayLoses = await getTotal(id, (match: any) => match.homeTeamGoals > match.awayTeamGoals);

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
