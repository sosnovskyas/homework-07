const oid = require('../libs/oid');

exports.User = [{
  _id: oid('user-mk'),
  email: 'mk@javascript.ru',
  displayName: 'mk',
  password: '123456'
}, {
  _id: oid('user-iliakan'),
  email: 'iliakan@javascript.ru',
  displayName: 'iliakan',
  password: '123456'
}];
