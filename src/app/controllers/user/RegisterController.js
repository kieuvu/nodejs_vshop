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

  // [GET]
  userEdit(req, res, next) {

    res.render("user/pages/userEdit", { user: res.locals.currentUser.username });
  }

  // [POST]
  async changePassword(req, res, next) {
    const stt = {
      err: false
    };
    const getUser = await Account.findOne({ username: res.locals.currentUser.username });
    const checkOldPass = await bcrypt.compare(req.body.password, getUser.password);

    if (!checkOldPass) {
      stt.err = true;
      stt.oldPass = false;
      res.json(stt);
    } else {
      const passwordRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
      );
      if (!passwordRegex.test(req.body.newPassword)) {
        stt.newPass = false;
        stt.err = true;
        res.json(stt);
      } else if (req.body.newPassword != req.body.renewPass) {
        stt.repass = false;
        stt.err = true;
        res.json(stt);
      } else {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        await Account.findOneAndUpdate(
          { username: res.locals.currentUser.username },
          {
            "$set": {
              password: hashedPassword
            }
          }
        );
        res.json(stt);
      }
    }

  }
}

module.exports = new RegisterController;