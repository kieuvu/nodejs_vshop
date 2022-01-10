const User = require('../../models/account.model');

class UserController {
  //[GET]
  index(req, res, next) {
    res.render('admin/pages/user', { layout: 'admin' });
  }

  //[GET]
  async getUser(req, res, next) {
    const query = [];

    if (req.query.userperm) {
      const userperm = req.query.userperm;
      if (userperm != 'all') {
        query.push({ userperm: userperm });
      }
    }

    if (req.query.search_name) {
      const search_name = req.query.search_name;
      if (search_name.length > 0) {
        query.push({ 'username': new RegExp(search_name, 'i') });
      }
    }

    const finnal = { ...query[0], ...query[1] };

    await User.find(finnal)
      .then((users) => {
        res.json(users);
      });
  }

  //[DELETE]
  async deleteUser(req, res, next) {
    const stt = {
      err: false
    };
    const target = req.body.target;

    await User.deleteOne({ username: target })
      .then(() => {
        res.json(stt);
      });
  }

  //[PATCH]
  async updateUser(req, res, next) {
    const stt = {
      err: false
    };
    const target = req.body.target;
    const newPerm = req.body.newPerm;

    await User.updateOne({ username: target }, { userperm: newPerm })
      .then(() => {
        res.json(stt);
      });
  }
}

module.exports = new UserController;