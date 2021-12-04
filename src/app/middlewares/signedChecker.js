const jwt = require('jsonwebtoken');

class SignedChecker {
  checker(req, res, next) {
    const user_token_cookie = req.cookies.user_token;

    if (user_token_cookie) {
      jwt.verify(user_token_cookie, process.env.JWT_SECRET, async function (err, decoded) {
        if (err) {
          res.locals.currentUser = null;
          next();
        } else {
          res.locals.currentUser = decoded;
          next();
        }
      });
    } else {
      res.locals.currentUser = null;
      next();
    }
  }
}

module.exports = new SignedChecker;