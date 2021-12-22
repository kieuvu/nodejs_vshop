const Account = require('../models/account.model');

class RegisterValidate {

  async validate(req, res, next) {
    // RegExp
    const accountRegex = /^[a-zA-Z0-9]{8,}$/;
    const passwordRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
    );

    // Store Validate Status
    const err = {
      err: false,
    };

    // User Input
    const username = req.body.username;
    const password = req.body.password;
    const repass = req.body.repass;

    // Validate Username
    if (!accountRegex.test(username)) {
      err.username = "Tài khoản không hợp lệ !!!";
      err.err = true;
    } else {
      await Account.find({ username: username })
        .then((data) => {
          if (data.length) {
            err.username = "Tài khoản đã tồn tại !!!";
            err.err = true;
          }
        });
    }

    // Validate Password
    if (!passwordRegex.test(password)) {
      err.password = "Mật khẩu không hợp lệ !!!";
      err.err = true;
    } else {
      if (repass != password) {
        err.password = "Mật khẩu nhập lại chưa đúng !!!";
        err.err = true;
      }
    }

    // Finnal Result
    if (err.err) {
      res.render('user/pages/register', {
        err: err
      });
    } else {
      next();
    }
  }
}

module.exports = new RegisterValidate;