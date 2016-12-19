'use strict';
module.exports = {
  host: 'localhost',
  port: 6000,
  mongoose: {
    uri: 'mongodb://localhost/hw7-test',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },

};