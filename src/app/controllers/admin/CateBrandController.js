const Category = require("../../models/cate.model");
const Brand = require("../../models/brand.model");

class CateBrandController {
  //[GET]
  showCateBrand(req, res, next) {
    const categories = req.body.cate;
    const brands = req.body.brand;
    res.render('admin/pages/showcatebrand', { layout: "admin" });
  }

  //[GET];
  async getAll(req, res, next) {
    const data = await Promise.all(
      [Category.find().sort({ cate_name: 1 }), Brand.find().sort({ brand_name: 1 })]
    );
    const categories = data[0];
    const brands = data[1];
    res.json({ categories, brands });
  }

  //[POST]
  async add(req, res, next) {
    const stt = {
      err: false,
    };

    if (req.body.cate_name) {
      const cate_name = req.body.cate_name;
      const cate_slug = req.body.cate_slug;

      const newCategory = new Category({ cate_name, cate_slug });
      await newCategory.save()
        .then(() => {
          res.json(stt);
        });
    }

    if (req.body.brand_name) {
      const brand_name = req.body.brand_name;
      const brand_slug = req.body.brand_slug;

      const newBrand = new Brand({ brand_name, brand_slug });
      await newBrand.save()
        .then(() => {
          res.json(stt);
        });
    }
  }

  //[DELETE];
  async delete(req, res, next) {
    const stt = {
      err: false,
    };

    const target = req.body.target;
    const id = req.body.id;

    if (target == "cate") {
      await Category.deleteOne({ cate_slug: id })
        .then(() => {
          res.json(stt);
        });
    }

    if (target == "brand") {
      await Brand.deleteOne({ brand_slug: id })
        .then(() => {
          res.json(stt);
        });
    }
  }
}
module.exports = new CateBrandController;