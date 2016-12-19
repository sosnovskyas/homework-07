'use strict';
const config = require('config');
const dbApi = require(`${config.root}/libs/dbApi`);

const handler = async(ctx) => {
  if (ctx.isAuthenticated()) {
    let userModel = dbApi.getModel('user');
    ctx.body = await userModel.create(ctx.request.body);
    ctx.status = 201;
  } else {
    ctx.status = 401;
  }
};

exports.route = {
  metod: 'post',
  path: '/users',
  handler
};
