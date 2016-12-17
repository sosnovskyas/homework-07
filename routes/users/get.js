'use strict';

const dbApi = require('../../libs/dbApi');

const handler = async(ctx) => {
  let userModel = dbApi.getModel('user');
  ctx.body = await userModel.find({});
};

exports.route = {
  metod: 'get',
  path: '/users',
  handler
};
