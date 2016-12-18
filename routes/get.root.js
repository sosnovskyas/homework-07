'use strict';

const handler = async(ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }
};
exports.route = {
  metod: 'get',
  path: '/',
  handler
};
