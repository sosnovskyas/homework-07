const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  app: {
    port: 5000
  },

  mongoose: {
    uri: 'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
  crypto: {
    hash: {
      length: 128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  },
  rememberme: {
    key: 'remember',
    cookie: {
      httpOnly: true,
      path: '/',
      overwrite: true,
      signed: false,
      maxAge: 7 * 3600 * 24 * 1e3 // 7 days
    }
  },
  template: {
    // template.root uses config.root
    root: defer((cfg) => {
      return path.join(cfg.root, 'templates');
    })
  },
  root: process.cwd()
};
