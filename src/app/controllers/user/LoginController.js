const jwt = require('jsonwebtoken');

class LoginController {
  // [GET]
  index(req, res, next) {
    res.render('user/pages/login');
  };

  // [POST]
  async redirect(req, res, next) {
    const username = req.body.username;
    const userperm = req.body.userperm;

    const access_token = await jwt.sign
      (
        {
          username: username, userperm: userperm
        },
        process.env.JWT_SECRET
      );

    res.cookie('user_token', access_token);

    res.redirect('/');
  };
}

module.exports = new LoginController;