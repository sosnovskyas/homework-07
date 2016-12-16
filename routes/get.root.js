'use strict';

const handler = async(ctx) => {
  //TODO: реализовать функционал проверки авторизации
  // if (ctx.isAuthenticated()) {
  //   ctx.body = ctx.render('welcome');
  // } else {
  ctx.body = ctx.render('login');
  // }
};

exports.route = {
  metod: 'get',
  path: '/',
  handler
};
