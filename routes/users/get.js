'use strict';

const handler = async(ctx) => {
  ctx.body = 'users response';
};

exports.route = {
  metod: 'get',
  path: '/users',
  handler
};
