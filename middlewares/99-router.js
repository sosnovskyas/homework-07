'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');

const Router = require('koa-router');
const router = new Router();

const mongoose = require('mongoose');
const dbApi = require(`${config.root}/libs/dbApi`);

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

// проверка параметра userById на корректность ID
router.param('userById', async(id, ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  let userModel = dbApi.getModel('user');
  ctx.userById = await userModel.findById(id);

  if (!ctx.userById) {
    ctx.throw(404);
  }

  await next();
});

exports.init = app => app.use(router.routes());
