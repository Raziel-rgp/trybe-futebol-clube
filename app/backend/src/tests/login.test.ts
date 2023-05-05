import * as sinon from 'sinon'; // Importa a biblioteca Sinon, utilizada para criação de stubs
import * as chai from 'chai'; // Importa a biblioteca Chai, utilizada para asserções
// @ts-ignore
import chaiHttp = require('chai-http'); // Importa a biblioteca Chai Http, utilizada para testes de integração

import { app } from '../app'; // Importa o arquivo app.ts, onde se encontra a aplicação

import { Response } from 'superagent'; // Importa a interface Response, utilizada para manipulação da resposta HTTP
import { tokenMock } from './mock/token.mock';

chai.use(chaiHttp); // Define que a biblioteca Chai utilizará a biblioteca Chai Http

const { expect } = chai; // Define a constante 'expect' para usar a biblioteca Chai

describe('Verifica a rota /login', () =>{
  afterEach(sinon.restore)
  let chaiHttpResponse: Response;

  it('Retorna status 400, caso email não seja informado', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({"email": "", "password": "123456"});
    expect(chaiHttpResponse.status).to.be.eq(400)
    expect(chaiHttpResponse.body).to.be.deep.eq({"message": "All fields must be filled"})
  });

  it('Retorna status 400, caso password não seja informado', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({"email": "email@email.com", "password": ""});
    expect(chaiHttpResponse.status).to.be.eq(400)
    expect(chaiHttpResponse.body).to.be.deep.eq({"message": "All fields must be filled"})
  });

  it('Retorna status 401, caso email seja invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({"email": "@email.com", "password": "123456"});
    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body).to.be.deep.eq({"message": "Invalid email or password"})
  });

  it('Retorna status 400, caso password seja invalida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({"email": "email@email.com", "password": "123"});
    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body).to.be.deep.eq({"message": "Invalid email or password"})
  });

  it('Retorna status 200, caso tudo seja valido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({"email": "user@user.com", "password": "secret_user"});
    expect(chaiHttpResponse.status).to.be.eq(200)
  });

});