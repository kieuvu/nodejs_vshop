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
      if (res.locals.currentUser.userperm == 1) {
        next();
      } else {
        res.redirect('back');
      }
    } else {
      res.redirect('back');
    }
  }
}

module.exports = new PreventAccess;