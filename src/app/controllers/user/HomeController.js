class HomeController {
  // [GET]
  index(req, res, next) {
    res.render("user/pages/home");
  }
}

module.exports = new HomeController;