const Product = require("../../models/product.model");

class ProductController {
  //[GET]
  index(req, res, next) {
    res.render('user/pages/product');
  }

  //[GET]
  detail(req, res, next) {
    res.render('user/pages/detail');
  }

}

module.exports = new ProductController;