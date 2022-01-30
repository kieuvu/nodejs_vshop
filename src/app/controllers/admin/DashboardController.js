const Product = require("../../models/product.model");
const Ordered = require("../../models/ordered.model");
const Account = require("../../models/account.model");
const Post = require("../../models/post.model");
class DashboardController {
  //[GET]
  index(req, res, next) {
    res.render('admin/pages/dashboard', { layout: 'admin' });
  }

  //[GET]
  async getAnalytics(req, res, next) {
    const result = {
      totalProductBought: 0,
      totalEarn: 0,
      totalCompleteOrder: 0,
      totalProduct: 0,
      totalPost: 0,
      totalUser: 0,
    };
    const completeOrder = await Ordered.find({ stage: 2 });
    const totalProduct = await Product.find({});
    const totalUser = await Account.find({}).count();
    const totalPost = await Post.find({}).count();

    completeOrder.forEach((item) => {
      result.totalEarn += item.total_price;
      result.totalCompleteOrder++;
      item.items.forEach((product) => {
        result.totalProductBought += product.quantity;
      });
    });

    totalProduct.forEach((product) => {
      result.totalProduct += product.prd_quantity;
    });

    result.totalUser = totalUser;
    result.totalPost = totalPost;
    res.json(result);
  }
}

module.exports = new DashboardController;