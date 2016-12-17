'use strict';
const config = require('config');
const dbApi = require(`${config.root}/libs/dbApi`);

const handler = async(ctx) => {
  let userModel = dbApi.getModel('user');
  let user = await userModel.findById(ctx.userById);

  for (let key in ctx.request.body) {
    user[key] = ctx.request.body[key];
  }
  await user.save();

  ctx.status = 204;
};

exports.route = {
  metod: 'patch',
  path: '/users/:userById',
  handler
};
