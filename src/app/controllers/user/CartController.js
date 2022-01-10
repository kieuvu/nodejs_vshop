const Cart = require('../../models/cart.model');
const Ordered = require('../../models/ordered.model');

class CartController {
  //[GET]
  index(req, res, next) {
    res.render('user/pages/cart.hbs');
  }

  //[POST]
  async add(req, res, next) {
    req.body.items = JSON.parse(req.body.items);
    const stt = {
      err: false
    };

    if (!res.locals.currentUser) {
      stt.err = true;
      stt.hasAccount = false;
      res.json(stt);
    } else {
      await Cart.findOne({ user: res.locals.currentUser.username })
        .then(async (data) => {
          if (data) {
            const existedItem = data.items.find((p) => p.product_id == req.body.items[0].product_id);
            if (existedItem) {
              await Cart.findOneAndUpdate(
                {
                  user: res.locals.currentUser.username,
                  items: {
                    $elemMatch: { product_id: req.body.items[0].product_id }
                  },
                },
                {
                  "$set": {
                    "items.$.quantity": existedItem.quantity + req.body.items[0].quantity,
                  },
                  "$inc": {
                    total_price: req.body.items[0].quantity * req.body.items[0].price
                  }
                }).then(() => {
                  res.json(stt);
                });
            } else {
              await Cart.findOneAndUpdate(
                { user: res.locals.currentUser.username },
                {
                  '$push': {
                    items: req.body.items[0]
                  },
                  '$inc': {
                    total_price: req.body.items[0].quantity * req.body.items[0].price
                  }
                }
              ).then(() => {
                res.json(stt);
              });
            }
          } else {
            const cart = new Cart({
              user: res.locals.currentUser.username,
              items: req.body.items,
              total_price: req.body.items[0].price * req.body.items[0].quantity
            });
            await cart.save()
              .then(() => {
                res.json(stt);
              });
          }
        });
    }
  }

  //[POST]
  async decrease(req, res, next) {
    req.body.items = JSON.parse(req.body.items);
    const stt = {
      err: false
    };
    await Cart.findOne({ user: res.locals.currentUser.username })
      .then(async (data) => {
        const targetItem = data.items.find((p) => p.product_id == req.body.items[0].product_id);
        await Cart.findOneAndUpdate(
          {
            user: res.locals.currentUser.username,
            items: {
              $elemMatch: { product_id: req.body.items[0].product_id }
            },
          },
          {
            "$set": {
              "items.$.quantity": targetItem.quantity - req.body.items[0].quantity,
            },
            "$inc": {
              total_price: - (req.body.items[0].quantity * req.body.items[0].price)
            }
          }).then(() => {
            res.json(stt);
          });
      });
  };

  //[GET]
  async get(req, res, next) {
    if (res.locals.currentUser) {
      await Cart.findOne({ user: res.locals.currentUser.username, in_process: '0' })
        .then((data) => {
          res.json(data);
        });
    }
  }

  //[POST]
  async delete(req, res, next) {
    req.body.items = JSON.parse(req.body.items);
    const stt = {
      err: false
    };
    await Cart.findOne({ user: res.locals.currentUser.username })
      .then(async (data) => {
        const targetItem = data.items.find((p) => p.product_id == req.body.items[0].product_id);
        await Cart.findOneAndUpdate(
          {
            user: res.locals.currentUser.username,
            items: {
              $elemMatch: { product_id: req.body.items[0].product_id }
            },
          },
          {
            "$pull": {
              items: { product_id: req.body.items[0].product_id },
            },
            "$inc": {
              total_price: - (targetItem.quantity * targetItem.price)
            }
          }).then(() => {
            res.json(stt);
          });
      });
  }

  //[POST]
  async checkout(req, res, next) {
    const stt = {
      err: false
    };
    const userName = res.locals.currentUser.username;
    console.log(id);
  }
}

module.exports = new CartController;