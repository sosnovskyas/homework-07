'use strict';

const dbApi = require('../../libs/dbApi');
const config = require('config');
// const sendMail = require('../../libs/sendMail');
const nodemailer = require('nodemailer');


const handler = async(ctx) => {
  let User = dbApi.getModel('user');
  const verifyEmailToken = Math.random().toString(36).slice(2, 10);
  const user = new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
    password: ctx.request.body.password,
    verifiedEmail: false,
    verifyEmailToken: verifyEmailToken,
    verifyEmailRedirect: ctx.request.body.successRedirect
  });


  try {
    await user.save();
  } catch (e) {
    if (e.name == 'ValidationError') {
      let errorMessages = '';
      for (let key in e.errors) {
        errorMessages += `${key}: ${e.errors[key].message}<br>`;
      }
      ctx.flash('error', errorMessages);
      ctx.redirect('/register');
      return;
    } else {
      ctx.throw(e);
    }
  }

  // We're here if no errors happened

  // await sendMail({
  //   template: 'verify-registration-email',
  //   to: user.email,
  //   subject: 'Подтверждение email',
  //   link: config.app.host + '/verify-email/' + verifyEmailToken
  // });


  const sendMailTransport = require('nodemailer-sendmail-transport');
  const transport = nodemailer.createTransport(
    sendMailTransport({})
  );
  const params = {
    from: 'lvlonstradamus@gmail.com',
    to: user.email,
    subject: 'Hi, body!',
    text: `${config.app.host}/verify-email/${verifyEmailToken}`
  };
// transport.sendMail(params, function (err, res) {
//     if (err) {
//       console.error(err);
//     }
//   });
  await transport.sendMail(params);

  ctx.body = 'Вы зарегистрированы. Пожалуйста, загляните в почтовый ящик, там письмо с Email-подтверждением.';
};

exports.route = {
  metod: 'post',
  path: '/register',
  handler
};
