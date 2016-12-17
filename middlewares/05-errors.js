module.exports = async(ctx, next) => {

  try {
    await next();
  } catch (e) {
    if (e.errors) {
      // Mongoose validation errors
      ctx.status = 422; // validation errors
      ctx.body = e.errors;
    } else if (e.status) {
      // could use template methods to render error page
      ctx.body = e.message;
      ctx.status = e.status;
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
      // console.error(e.message, e.stack);
    }
  }
};
