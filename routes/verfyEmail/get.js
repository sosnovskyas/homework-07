'use strict';
const dbApi = require('../../libs/dbApi');

// const User = require('../models/user');
const User = dbApi.getModel('user');

const handler = async(ctx) => {

  const user = await User.findOne({
    verifyEmailToken: ctx.params.verifyEmailToken
  });

  if (!user) {
    ctx.throw(404, 'Ссылка подтверждения недействительна или устарела.');
  }

  const redirect = user.verifyEmailRedirect || '/';
  delete user.verifyEmailRedirect;

  user.verifiedEmailsHistory.push({date: new Date(), email: user.email});

  if (!user.verifiedEmail) {
    user.verifiedEmail = true;
    await user.save();

  } else if (user.pendingVerifyEmail) {
    user.email = user.pendingVerifyEmail;

    try {
      await user.save();
    } catch (e) {
      if (e.name != 'ValidationError') {
        throw e;
      } else {
        ctx.throw(400, 'Изменение email невозможно, адрес уже занят.');
      }
    }

  } else {
    ctx.throw(404, 'Изменений не произведено: ваш email и так верифицирован, его смена не запрашивалась.');
  }

  delete user.verifyEmailToken;

  await ctx.login(user);

  ctx.redirect(redirect);
};
exports.route = {
  metod: 'get',
  path: '/verify-email/:verifyEmailToken',
  handler
};
