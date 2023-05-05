import * as sinon from 'sinon'; // Importa a biblioteca Sinon, utilizada para criação de stubs
import * as chai from 'chai'; // Importa a biblioteca Chai, utilizada para asserções
// @ts-ignore
import chaiHttp = require('chai-http'); // Importa a biblioteca Chai Http, utilizada para testes de integração

import { app } from '../app'; // Importa o arquivo app.ts, onde se encontra a aplicação

import { Response } from 'superagent'; // Importa a interface Response, utilizada para manipulação da resposta HTTP
import Teams from '../database/models/Teams.model'; // Importa o modelo de times do banco de dados
import { teamMock } from './mock/team.mock';

chai.use(chaiHttp); // Define que a biblioteca Chai utilizará a biblioteca Chai Http

const { expect } = chai; // Define a constante 'expect' para usar a biblioteca Chai

describe('Seu teste', () => {
  let chaiHttpResponse: Response; // Declara a variável que será utilizada para manipular a resposta HTTP

  afterEach(() => {
    sinon.restore(); // Restaura o estado da biblioteca Sinon após cada teste
  });

  // Testa se a rota '/times' retorna a lista de todos os times
  it('Retorna lista de todos os times', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamMock as Teams[]); // Cria um stub para a função 'findAll' do modelo de times, simulando o retorno da lista de times
    chaiHttpResponse = await chai.request(app).get('/teams'); // Faz uma requisição GET para a rota '/times' e armazena a resposta HTTP na variável 'chaiHttpResponse'
    expect(chaiHttpResponse.status).to.be.eq(200); // Verifica se o status retornado é 200
    expect(chaiHttpResponse.body).to.be.deep.eq(teamMock); // Verifica se o corpo da resposta é a lista de times mockada
    sinon.restore(); // Restaura o estado da biblioteca Sinon após o teste\
  });

  // Testa se a rota '/times/:id' retorna o time com o id especificado
  it('Busca pelo Id', async () => {
    sinon.stub(Teams, 'findOne').resolves(teamMock[1] as Teams); // Cria um stub para a função 'findOne' do modelo de times, simulando o retorno do time com id 2
    chaiHttpResponse = await chai.request(app).get('/teams/2'); // Faz uma requisição GET para a rota '/times/2' e armazena a resposta HTTP na variável 'chaiHttpResponse'
    expect(chaiHttpResponse.status).to.be.eq(200); // Verifica se o status retornado é 200
    expect(chaiHttpResponse.body).to.be.deep.eq(teamMock[1]); // Verifica se o corpo da resposta é o time com id 2 mockado
    sinon.restore(); // Restaura o estado da biblioteca Sinon após o teste
  });

  // Teste se a rota '/teams/:id' retorna um erro ao receber um id inválido
  it('Teste se dá erro ao colocar um id inválido', async () => {
    // Cria um stub (imitação) da função Teams.findOne para simular um erro ao receber um id inválido
    sinon.stub(Teams, 'findOne').returns(Promise.reject(new Error('Invalid id')));
    // Chama a rota '/teams/:id' com um id inválido usando o pacote Chai-HTTP e armazena a resposta em chaiHttpResponse
    chaiHttpResponse = await chai.request(app).get('/teams/6');
    // Verifica se o status da resposta é 500 (Internal Server Error)
    expect(chaiHttpResponse.status).to.be.eq(500);
    // Restaura a função original Teams.findOne
    sinon.restore();
  });
});
