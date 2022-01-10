class PreventAccess {

  signed(req, res, next) {
    if (res.locals.currentUser) {
      res.redirect('/');
    } else {
      next();
    }
  }

  admin(req, res, next) {
    if (res.locals.currentUser) {
      if (res.locals.currentUser.userperm == 1 || res.locals.currentUser.userperm == 2) {
        next();
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/');
    }
  }
}

module.exports = new PreventAccess;