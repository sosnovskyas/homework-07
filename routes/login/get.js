'use strict';

const handler = async(ctx) => {
  ctx.body = ctx.render('login');
};
exports.route = {
  metod: 'get',
  path: '/login',
  handler
};
