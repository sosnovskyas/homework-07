'use strict';
const config = require('config');
const dbApi = require(`${config.root}/libs/dbApi`);

const handler = async(ctx) => {
  if (ctx.isAuthenticated()) {
    let userModel = dbApi.getModel('user');
    ctx.body = await userModel.find({});
  } else {
    ctx.status = 401;
  }
};

exports.route = {
  metod: 'get',
  path: '/users',
  handler
};
