'use strict';

const config = require('config');
const should = require('should');

const app = require(`${config.root}/app`);
const mongoose = require(`${config.root}/libs/mongoose`);
const dbApi = require(`${config.root}/libs/dbApi`);
const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
});

let server;
const serverPath = `http://${config.host}:${config.port}`;
const fixturesPath = `${config.root}/fixtures/users`;

describe('server', () => {

  before(done => {
    //noinspection JSUnresolvedFunction
    server = app.listen(config.port, done);
  });

  after(done => {
    server.close(done);
  });

  context('home page', () => {
    it('must return status 200 and basic markup', async() => {
      let response = await request({
        method: 'get',
        uri: `${serverPath}`,
        json: true,
      });

      should(response.statusCode).eql(200);
      should.exist(response.body);
    });
  });

  describe('REST API', () => {
    before(async() => {
      await mongoose.connection.dropDatabase();
      let Users = dbApi.getModel('user');
      await Promise.all(
        require(fixturesPath).User // users array
          .map(
            item => {
              let newUser = new Users(item);
              return newUser.save();
            }
          )
      );
    });

    after(async() => {
      await mongoose.connection.close();
    });

    context('users', () => {
      // get all users
      it(`GET ${serverPath}/users response status 200 and users list`, async() => {
        let response = await request({
          method: 'get',
          uri: `${serverPath}/users`,
          json: true,
        });

        should(response.statusCode).eql(200);
        should(response.body).containDeep([
          {
            _id: '31ef97a095aa7859d9c6f43e',
            email: 'mk@javascript.ru',
            displayName: 'mk',
          },
          {
            _id: 'a5c9a78e68a0f5a85275ef53',
            email: 'iliakan@javascript.ru',
            displayName: 'iliakan',
          }
        ]);
      });

      // get user by ID
      it(`GET ${serverPath}/users/31ef97a095aa7859d9c6f43e response status 200 and users information`, async() => {
        let response = await request({
          method: 'get',
          uri: `${serverPath}/users/31ef97a095aa7859d9c6f43e`,
          json: true,
        });
        should(response.statusCode).eql(200);
        should(response.body).containDeep({
          _id: '31ef97a095aa7859d9c6f43e',
          email: 'mk@javascript.ru',
          displayName: 'mk',
        });
      });
      it(`GET ${serverPath}/users/qwe123 response status 415 (Unsupported Media Type)`, async() => {
        let response = await request({
          method: 'get',
          uri: `${serverPath}/users/qwe123`,
          json: true,
        });
        should(response.statusCode).eql(415);
      });
      it(`GET ${serverPath}/users/000000000000000000000000 response status 404 (not found)`, async() => {
        let response = await request({
          method: 'get',
          uri: `${serverPath}/users/000000000000000000000000`,
          json: true,
        });
        should(response.statusCode).eql(404);
      });

      // create user
      it(`POST ${serverPath}/users with user data response status 201 (created) and user`, async() => {
        const userData = {email: 'alex@mymail.com', displayName: 'alex', password: 'qweqweqwe'};
        const checkData = {email: 'alex@mymail.com', displayName: 'alex'};

        let response = await request({
          method: 'post',
          uri: `${serverPath}/users`,
          body: userData,
          json: true,
        });

        should(response.statusCode).eql(201);
        should(response.body).containDeep(checkData);
      });
      it(`POST ${serverPath}/users with incorrect email in user data response status 422 (validation error)`, async() => {
        const userData = {
          email: 'qwe',
          displayName: 'alex',
          password: 'qweqweqwe'
        };
        let response = await request({
          method: 'post',
          uri: `${serverPath}/users`,
          body: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });
      it(`POST ${serverPath}/users without displayName in user data response status 422 (validation error)`, async() => {
        const userData = {
          email: 'qwe@qwe.ru',
          displayName: '',
          password: 'qweqweqwe'
        };
        let response = await request({
          method: 'post',
          uri: `${serverPath}/users`,
          body: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });
      it(`POST ${serverPath}/users without password in user data response status 422 (validation error)`, async() => {
        const userData = {
          email: 'qwe@qwe.ru',
          displayName: 'alex',
          password: ''
        };
        let response = await request({
          method: 'post',
          uri: `${serverPath}/users`,
          data: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });

      // change user
      it(`PATCH ${serverPath}/users/31ef97a095aa7859d9c6f43e with user data response status 204 (No Content)`, async() => {
        const userData = {displayName: 'MOLEX'};

        let response = await request({
          method: 'patch',
          uri: `${serverPath}/users/31ef97a095aa7859d9c6f43e`,
          body: userData,
          json: true,
        });

        should(response.statusCode).eql(204); // бикос стандарт ёмаё ))) RTFM you must - https://tools.ietf.org/html/rfc5789#section-2.1
        should(response.body).containDeep(userData);
      });
      it(`PATCH ${serverPath}/users/31ef97a095aa7859d9c6f43e with incorrect email in user data response status 422 (validation error)`, async() => {
        const userData = {
          email: 'qwe'
        };
        let response = await request({
          method: 'patch',
          uri: `${serverPath}/users`,
          body: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });
      it(`PATCH ${serverPath}/users/31ef97a095aa7859d9c6f43e without displayName in user data response status 422 (validation error)`, async() => {
        const userData = {
          displayName: ''
        };
        let response = await request({
          method: 'patch',
          uri: `${serverPath}/users/31ef97a095aa7859d9c6f43e`,
          body: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });
      it(`PATCH ${serverPath}/users/31ef97a095aa7859d9c6f43e without password in user data response status 422 (validation error)`, async() => {
        const userData = {
          password: ''
        };
        let response = await request({
          method: 'patch',
          uri: `${serverPath}/users/31ef97a095aa7859d9c6f43e`,
          data: userData,
          json: true,
        });
        should(response.statusCode).eql(422);
      });
    });
  });
});