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
    });
  });
});