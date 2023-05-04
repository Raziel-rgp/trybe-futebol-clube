// Importando o modelo Team
import Team from '../models/Teams.model';

// Função que busca todas as equipes e retorna uma lista
const findAllTeams = async () => {
  const teams = await Team.findAll(); // Busca todas as equipes usando o método "findAll" do modelo
  return teams; // Retorna a lista de equipes encontradas
};

// Função que busca uma equipe por ID e retorna um objeto de equipe
const findTeamById = async (id: string) => {
  const team = await Team.findOne({ where: { id } }); // Busca a equipe com o ID fornecido, usando o método "findOne" do modelo
  return team; // Retorna o objeto de equipe encontrado
};

// Exportando as funções para serem usadas em outros lugares do código
export default { findAllTeams, findTeamById };
