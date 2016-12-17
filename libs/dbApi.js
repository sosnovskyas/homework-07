'use strict';
const mongoose = require('mongoose');
const config = require('config');

module.exports = {
  getModel: (name) => {
    let model;

    try {
      model = mongoose.model(name);
    } catch (error) {
      model = require(`${config.root}/models/${name}`);
    }

    return model;
  }
};