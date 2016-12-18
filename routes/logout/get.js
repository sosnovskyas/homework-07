const handler = async(ctx) => {
  ctx.logout();

  ctx.session = null; // destroy session (!!!)

  ctx.redirect('/');
};

exports.route = {
  metod: 'post',
  path: '/logout',
  handler
};
