'use strict';

const path = require('path');
const should = require('should');

const app = require('../app');
const config = require('config');
const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
});

const serverPath = `http://${config.host}:${config.port}`;
const fixturesPath = path.join(__dirname, `../fixtures/users`);

let server;

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
    const mongoose = require('../libs/mongoose');

    beforeEach(async() => {
      await mongoose.connection.dropDatabase();

      let Users = mongoose.model('User');
      await Promise.all(
        require('../fixtures/users').User // users array
          .map(
            item => {
              let newUser = new Users(item);
              return newUser.save();
            }
          )
      );
    });


    afterEach(async() => {
      // await mongoose.model('User').find({}, (err, res) => {
      //   console.log(res)
      // });
      await mongoose.connection.close();
    });

    context('users', () => {
      // it(`GET ${serverPath}/users response status 200`, async() => {
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
    });
  });
});