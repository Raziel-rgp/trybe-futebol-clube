import Team from '../models/Team.model';

const findAllTeams = async () => {
  const teams = await Team.findAll();
  return teams;
};

const findTeamById = async (id: string) => {
  const team = await Team.findByPk(Number(id));
  return team;
};

export default { findAllTeams, findTeamById };
