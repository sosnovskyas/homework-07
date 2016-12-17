// request/response logger
const logger = require('koa-logger');
const convert = require('koa-convert');

if (process.env.NODE_ENV === 'development') {
  module.exports = convert(logger());
} else {
  module.exports = async(ctx, next) => {
    // empty logger middleware
    await next();
  };
}