'use strict';

const handler = async(ctx) => {
  ctx.body = ctx.render('register');
};
exports.route = {
  metod: 'get',
  path: '/register',
  handler
};
