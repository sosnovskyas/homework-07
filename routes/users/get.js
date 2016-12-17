'use strict';

const mongoose = require('mongoose');

const handler = async(ctx) => {
  let Users;

  try {
    Users = mongoose.model('User');
  } catch (error) {
    Users = require('../../models/user');
  }

  ctx.body = await Users.find({});
};

exports.route = {
  metod: 'get',
  path: '/users',
  handler
};
