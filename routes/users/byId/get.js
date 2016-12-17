'use strict';

const handler = async(ctx) => {
  ctx.body = ctx.userById;
};

exports.route = {
  metod: 'get',
  path: '/users/:userById',
  handler
};
