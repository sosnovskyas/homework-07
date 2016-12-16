'use strict';

const db = require('mongoose');

const handler = async(ctx) => {
  ctx.body = await db.model('User').find({});
};

exports.route = {
  metod: 'get',
  path: '/users',
  handler
};
