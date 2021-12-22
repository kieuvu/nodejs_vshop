/**
*
* @UserRoute
*
*/

const homeRoute = require('./user/home.route');
const registerRoute = require('./user/register.route');
const loginRoute = require('./user/login.route');
const logoutRoute = require('./user/logout.route');

const signedChecker = require('../app/middlewares/signedChecker');
const preventAccess = require('../app/middlewares/preventAccess');

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

  /**
   *
   * @AdminRouting
   *
   */

  app.use('/admin', preventAccess.admin, adminRoute);
}

module.exports = routeMatching;