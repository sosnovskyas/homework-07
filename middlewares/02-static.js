// Usually served by Nginx
const serve = require('koa-static');
const convert = require('koa-convert');

module.exports = convert(serve('public'));