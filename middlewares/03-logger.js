// request/response logger
const logger = require('koa-logger');
const convert = require('koa-convert');

exports.init = app => {
  if (process.env.NODE_ENV === 'development') {
    app.use(convert(logger()));
  }
};
