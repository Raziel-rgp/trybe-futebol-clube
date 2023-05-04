import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  let teamMock = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ];

  it('Retorna lista de todos os times', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamMock as Teams[]);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(teamMock);
    sinon.restore();
  });

  it('Busca pelo Id', async () => {
    sinon.stub(Teams, 'findOne').resolves(teamMock[1] as Teams);
    chaiHttpResponse = await chai.request(app).get('/teams/2');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(teamMock[1]);
    sinon.restore();
  });

  it('Teste se dá erro ao colocar um id inválido', async () => {
    sinon.stub(Teams, 'findOne').returns(Promise.reject(new Error('Invalid id')));
    chaiHttpResponse = await chai.request(app).get('/teams/6');
    expect(chaiHttpResponse.status).to.be.eq(500);
    sinon.restore();
  });
});
