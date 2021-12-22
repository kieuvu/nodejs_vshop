const Account = require('../models/account.model');
const bcrypt = require('bcrypt');

class LoginAuthenticate {

  async authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const err = {
      err: false
    };

    if (username == '' || password == '') {
      err.err = true;
      err.all = "Vui lòng điền đầy đủ tài khoản, mật khẩu !!!";
    } else {
      await Account.find({ username: username })
        .then(async (data) => {
          if (!data.length) {
            err.err = true;
            err.username = 'Tài khoản không tồn tại !!!';
          } else {
            await bcrypt.compare(password, data[0].password)
              .then((result) => {
                if (!result) {
                  err.err = true;
                  err.password = 'Sai mật khẩu !!!';
                } else {
                  req.body.userperm = data[0].userperm;
                }
              });
          }
        });
    }

    if (err.err) {
      res.render('user/pages/login', {
        err: err
      });
    } else {
      next();
    }
  }
}

module.exports = new LoginAuthenticate;