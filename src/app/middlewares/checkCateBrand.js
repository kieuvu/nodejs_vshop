const Category = require("../models/cate.model");
const Brand = require("../models/brand.model");

const slugFormatter = require("../../ultis/product/slugFormatter");

class CateBrandChecker {

  async exist(req, res, next) {
    const stt = {
      err: false
    };

    if (req.body.cate_name) {
      req.body.cate_slug = slugFormatter(req.body.cate_name);
      await Category.findOne({ cate_slug: req.body.cate_slug })
        .then((data) => {
          if (data) {
            const cate_err = `Danh mục ${req.body.cate_name} đã tồn tại !`;
            stt.err = true;
            stt.msg = cate_err;
            res.json(stt);
          } else {
            next();
          }
        });
    }

    if (req.body.brand_name) {
      req.body.brand_slug = slugFormatter(req.body.brand_name);
      await Brand.findOne({ brand_slug: req.body.brand_slug })
        .then((data) => {
          if (data) {
            const brand_err = `Thương hiệu ${req.body.brand_name} đã tồn tại !`;
            stt.err = true;
            stt.msg = brand_err;
            res.json(stt);
          } else {
            next();
          }
        });
    }
  }
}

module.exports = new CateBrandChecker;