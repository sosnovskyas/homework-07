// Usually served by Nginx
const favicon = require('koa-favicon');
const convert = require('koa-convert');

module.exports = convert(favicon());