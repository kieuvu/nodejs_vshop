const Account = require("../../models/account.model");
const bcrypt = require("bcrypt");

class RegisterController {
  // [GET]
  index(req, res, next) {
    res.render('user/pages/register', {
      title: 'Đăng ký',
    });
  }

  // [POST]
  async create(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const stt = {
      err: false
    };
    let passwordHashed = null;

    await bcrypt.hash(password, 10)
      .then((hashed) => {
        passwordHashed = hashed;
      });

    const newUser = new Account({
      username: username,
      password: passwordHashed,
    });

    await newUser.save()
      .then(() => {
        res.render('user/pages/register', { title: "Đăng kí", stt: stt });
      })
      .catch(() => {
        stt.err = true;
        res.json(stt);
      });
  }
}

module.exports = new RegisterController;