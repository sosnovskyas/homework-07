'use strict';

const should = require('should');

const app = require('../app');
const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
});

const config = require('config');

let server;

// const User = require('../models/user');

const serverPath = `http://${config.host}:${config.port}`;

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
    context('users', () => {
      it(`GET ${serverPath}/users response status 200`, async() => {
      /*it(`GET ${serverPath}/users response status 200 and list defaul users`, async() => {*/
        let response = await request({
          method: 'get',
          uri: `${serverPath}/users`,
          json: true,
        });

        should(response.statusCode).eql(200);
      });
    });
  });
});