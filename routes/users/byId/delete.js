'use strict';

const config = require('config');
const dbApi = require(`${config.root}/libs/dbApi`);

const handler = async(ctx) => {
  if (ctx.isAuthenticated()) {
    let userModel = dbApi.getModel('user');
    await userModel.remove(ctx.userById);

    ctx.status = 202;
  } else {
    ctx.status = 401;
  }
};

exports.route = {
  metod: 'delete',
  path: '/users/:userById',
  handler
};
