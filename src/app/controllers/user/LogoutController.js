class LogoutController {
  // [GET]
  logout(req, res, next) {
    res.clearCookie("user_token");
    res.redirect('/');
  }
}

module.exports = new LogoutController;