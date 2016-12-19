// const User = require('../../models/user');
const dbApi = require('../dbApi');
const passport = require('koa-passport');

// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
  done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser(function(id, done) {
  dbApi.getModel('user').findById(id, done); // callback version checks id validity automatically
});
