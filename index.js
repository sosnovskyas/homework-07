'use strict';

const config = require('config');

// long stack trace (+clarify from co) if needed
// if (process.env.TRACE) {
//   require('./libs/trace');
// }

const app = require('./app');

//noinspection JSUnresolvedFunction
app.listen(config.app.port);
