'use strict';
// const config = require('config');
// const dbApi = require(`${config.root}/libs/dbApi`);

/*
 const handler = async(ctx) => {
 let userModel = dbApi.getModel('user');
 ctx.body = await userModel.create(ctx.request.body);
 ctx.status = 201;
 };
 */

const passport = require('koa-passport');

const handler = async() => {

  // запускает стратегию, станадартные опции что делать с результатом
  // опции @https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js
  // можно передать и функцию
  await passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    //failureMessage: true // запишет сообщение об ошибке в session.messages[]
    failureFlash: true // req.flash

    // assignProperty: 'something' присвоить юзера в свойство req.something
    //   - нужно для привязывания акков соц. сетей
    // если не стоит, то залогинит его вызовом req.login(user),
    //   - это поместит user.id в session.passport.user (если не стоит опция session:false)
    //   - также присвоит его в req.user
  });

};

exports.route = {
  metod: 'post',
  path: '/login',
  handler
};
