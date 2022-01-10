/**
*
* @UserRoute
*
*/

const homeRoute = require('./user/home.route');
const registerRoute = require('./user/register.route');
const loginRoute = require('./user/login.route');
const logoutRoute = require('./user/logout.route');
const productRoute = require('./user/product.route');

const signedChecker = require('../app/middlewares/signedChecker');
const preventAccess = require('../app/middlewares/preventAccess');

const productController = require('../app/controllers/admin/ProductController');
const cateBrandController = require('../app/controllers/admin/CateBrandController');
const cartController = require('../app/controllers/user/CartController');

/**
 *
 * @AdminRoute
 *
 */

const adminRoute = require('./admin/adminRoute');

/**
 *
 * @Routing
 *
 */

function routeMatching(app) {
  app.use('*', signedChecker.checker);

  /**
   *
   * @UserRouting
   *
   */

  app.use("/", homeRoute);
  app.use("/register", preventAccess.signed, registerRoute);
  app.use("/login", preventAccess.signed, loginRoute);
  app.use("/logout", logoutRoute);
  app.use("/product", productRoute);

  /**
   *
   * @AdminRouting
   *
   */

  app.use('/admin', preventAccess.admin, adminRoute);

  /**
   *
   * @API
   *
   */

  app.use('/api/product/getproduct', productController.getProduct);
  app.use('/api/product/catebrand/getall', cateBrandController.getAll);
  app.use('/api/product/cart/get', cartController.get);
}

module.exports = routeMatching;