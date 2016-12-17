'use strict';
const fs = require('fs');
const config = require('config');

const Koa = require('koa');
const app = module.exports = new Koa();

require('./libs/mongoose');

const middlewares = fs.readdirSync(`${config.root}/middlewares`).sort();

middlewares.forEach((middleware) => {
  app.use(require('./middlewares/' + middleware));
});