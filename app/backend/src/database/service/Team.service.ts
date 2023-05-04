import Team from '../models/Teams.model';

const findAllTeams = async () => {
  const teams = await Team.findAll();
  return teams;
};

const findTeamById = async (id: string) => {
  const team = await Team.findOne({ where: { id } });
  return team;
};

export default { findAllTeams, findTeamById };
