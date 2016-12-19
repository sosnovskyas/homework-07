'use strict';

const passport = require('koa-passport');

const handler = passport.authenticate('facebook', {
  successRedirect: '/users',
  failureRedirect: '/login',
  //failureMessage: true // запишет сообщение об ошибке в session.messages[]
  failureFlash: true // req.flash

  // assignProperty: 'something' присвоить юзера в свойство req.something
  //   - нужно для привязывания акков соц. сетей
  // если не стоит, то залогинит его вызовом req.login(user),
  //   - это поместит user.id в session.passport.user (если не стоит опция session:false)
  //   - также присвоит его в req.user
});

exports.route = {
  metod: 'post',
  path: '/login/fb',
  handler
};
