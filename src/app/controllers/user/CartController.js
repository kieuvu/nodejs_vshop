const Cart = require('../../models/cart.model');
const Ordered = require('../../models/ordered.model');

class CartController {
  //[GET]
  index(req, res, next) {
    res.render('user/pages/cart.hbs');
  }

  //[POST]
  async add(req, res, next) {
    const stt = {
      err: false
    };
    if (!res.locals.currentUser) {
      stt.err = true;
      stt.hasAccount = false;
      res.json(stt);
    } else {
      if (req.body.rebuy) {
        const data = await Ordered.findById(req.body.id);
        const dataItems = data.items;

        (async () => {
          for (let i = 0; i < dataItems.length; i++) {
            dataItems[i].quantity = 1;
            await Cart.findOne({ user: res.locals.currentUser.username })
              .then(async (data) => {
                if (data) {
                  const existedItem = data.items.find((p) => p.product_id == dataItems[i].product_id);
                  if (existedItem) {
                    await Cart.findOneAndUpdate(
                      {
                        user: res.locals.currentUser.username,
                        items: {
                          $elemMatch: { product_id: dataItems[i].product_id }
                        },
                      },
                      {
                        "$set": {
                          "items.$.quantity": existedItem.quantity + dataItems[i].quantity,
                        },
                        "$inc": {
                          total_price: dataItems[i].quantity * dataItems[i].price
                        }
                      });
                  } else {
                    await Cart.findOneAndUpdate(
                      { user: res.locals.currentUser.username },
                      {
                        '$push': {
                          items: dataItems[i]
                        },
                        '$inc': {
                          total_price: dataItems[i].quantity * dataItems[i].price
                        }
                      }
                    );
                  }
                } else {
                  const cart = new Cart({
                    user: res.locals.currentUser.username,
                    items: [dataItems[i]],
                    total_price: dataItems[i].price * dataItems[i].quantity
                  });
                  await cart.save();
                }
              });
          }
          res.json(stt);
        })();
      } else {
        req.body.items = JSON.parse(req.body.items);
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
      await Cart.findOne({ user: res.locals.currentUser.username })
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

    const product_data = await Cart.findOne({ _id: req.body.id });

    const order = new Ordered({
      user: res.locals.currentUser.username,
      items: product_data.items,
      info: JSON.parse(req.body.info),
      total_price: product_data.total_price,
    });

    await order.save()
      .then(async () => {
        await Cart.deleteOne(
          { _id: req.body.id },
        );
        res.json(stt);
      });
  }
}

module.exports = new CartController;