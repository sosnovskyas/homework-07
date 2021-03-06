const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  app: {
    host: 'localhost',
    port: 5000
  },
  providers: {
    facebook: {
      appId: '1832999316969853',
      appSecret: '187b7856b36ebfb07db10f67e54a2ea2',
      test: {
        login: 'course.test.facebook@gmail.com',
        password: 'course-test-facebook'
      },
      passportOptions: {
        display: 'popup',
        scope: ['email']
      }
    }
  },
  mongoose: {
    uri: 'mongodb://localhost/hw7',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'course.test.mailer',
      password: 'course-test-password'
    },
    senders:  {
      // transactional emails, register/forgot pass etc
      default:  {
        fromEmail: 'course.test.mailer@gmail.com',
        fromName:  'JavaScript.ru',
        signature: '<em>С уважением,<br>Я</em>'
      },
      // newsletters
      informer: {
        fromEmail: 'someother@email.com',
        fromName:  'Newsletters',
        signature: '<em>Have fun!</em>'
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
