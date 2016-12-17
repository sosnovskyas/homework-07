'use strict';

const config = require('config');
const dbApi = require(`${config.root}/libs/dbApi`);

const handler = async(ctx) => {
  let userModel = dbApi.getModel('user');
  await userModel.remove(ctx.userById);

  ctx.status = 202;
};

exports.route = {
  metod: 'delete',
  path: '/users/:userById',
  handler
};
