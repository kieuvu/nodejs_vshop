const Ordered = require('../../models/ordered.model');

class OrderedController {
  //[GET]
  index(req, res, next) {
    res.render('admin/pages/ordered', { layout: 'admin' });
  }

  //[GET]
  userIndex(req, res, next) {
    res.render('user/pages/ordered');
  }

  //[GET]
  async getOrder(req, res, next) {
    await Ordered.find({ stage: +req.query.stage })
      .then((data) => {
        res.json(data);
      });
  }

  //[POST]
  async updateState(req, res, next) {
    const stt = {
      err: false
    };
    if (!req.body.cancel) {
      await Ordered.findOneAndUpdate(
        { _id: req.body.id },
        {
          "$inc": {
            stage: 1
          }
        }
      ).then(() => {
        res.json(stt);
      });
    } else {
      await Ordered.findOneAndUpdate(
        { _id: req.body.id },
        {
          "$set": {
            stage: 3
          }
        }
      ).then(() => {
        res.json(stt);
      });
    }
  }

  //[GET]
  async getUserData(req, res, next) {
    if (req.query.stage != 'all') {
      await Ordered.find({ user: res.locals.currentUser.username, stage: req.query.stage }).sort({ updatedAt: -1 })
        .then((data) => {
          res.json(data);
        });
    } else {
      await Ordered.find({ user: res.locals.currentUser.username }).sort({ updatedAt: -1 })
        .then((data) => {
          res.json(data);
        });
    }
  }
}

module.exports = new OrderedController;