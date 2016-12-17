'use strict';
module.exports = {
  host: '127.0.0.1',
  port: 6000,
  mongoose: {
    uri: 'mongodb://127.0.0.1/hw7-test',
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