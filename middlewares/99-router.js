'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('koa-router');
const router = new Router();

const mongoose = require('mongoose');
const User = require('../models/user');

/*
 async function *isAuthenticated(next) {
 if (!ctx.isAuthenticated) {
 ctx.throw(403);
 } else {
 await next();
 }
 }
 */

let routes = [];

const getFiles = (path, files) => {
  fs.readdirSync(path).forEach(function (file) {
    let subpath = path + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      getFiles(subpath, files);
    } else {
      files.push(path + '/' + file);
    }
  });
};

getFiles(path.join(__dirname, '../routes'), routes);

routes.forEach(customRoute => {
  const r = require(customRoute).route;
  router[r.metod](r.path, r.handler);
});

router.param('userById', async(id, ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.userById = await User.findById(id);

  if (!ctx.userById) {
    ctx.throw(404);
  }

  await next();
});

exports.init = app => app.use(router.routes());
