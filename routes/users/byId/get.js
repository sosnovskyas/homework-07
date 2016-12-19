'use strict';

const handler = async(ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.userById;
  } else {
    ctx.status = 401;
  }
};

exports.route = {
  metod: 'get',
  path: '/users/:userById',
  handler
};
