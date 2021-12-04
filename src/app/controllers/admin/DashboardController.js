class DashboardController {
  //[GET]
  index(req, res, next) {
    res.render('admin/pages/dashboard', { layout: 'admin' });
  }
}

module.exports = new DashboardController;