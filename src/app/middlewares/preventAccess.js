class PreventAccess {
  sign(req, res, next) {
    if (res.locals.currentUser) {
      res.redirect('/');
    } else {
      next();
    }
  }
  admin(req, res, next) {

  }
}

module.exports = new PreventAccess;