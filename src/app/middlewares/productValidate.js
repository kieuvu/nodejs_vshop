const randomID = require('../../ultis/product/randomID');
const Product = require('../models/product.model');

class ProductValidate {

  //[POST]
  getProductId(req, res, next) {
    async function getProductId() {
      let newID = randomID(10);

      await Product.findOne({ prd_id: newID })
        .then(function (data) {
          if (data) {
            getProductId();
          } else {
            req.body.prd_id = newID;
            next();
          }
        });
    };
    getProductId();
  }
}

module.exports = new ProductValidate;