'use strict';

const should = require('should');

// const app = require('../app');
// const request = require('request-promise').defaults({
//   resolveWithFullResponse: true,
//   simple: false
// });

// const config = require('config');

// let server;

// const User = require('../models/user');

// const serverPath = `http://${config.host}:${config.port}`;

describe('server REST API', () => {
  context('home page', () => {
    it('must return status 200 and basic markup', async() => {
      should().equal(200);
    });
  });
});