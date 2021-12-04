const Product = require("../../models/product.model");
const fs = require('fs');

class ProductController {
  //[GET]
  index(req, res, next) {
    res.send("product side");
  }

  //[GET]
  create(req, res, next) {
    res.render("admin/pages/addnew", { layout: "admin" });
  };

  //[POST]
  async add(req, res, next) {
    const stt = {
      err: false
    };
    const { prd_name, prd_id, prd_desc, prd_price, prd_cate, prd_brand } = req.body;
    const { prd_stImg, prd_scImg, prd_rdImg, prd_thImg, } = req.files;
    const newProduct = new Product({
      prd_name: prd_name,
      prd_id: prd_id,
      prd_desc: prd_desc,
      prd_price: prd_price,
      prd_cate: prd_cate,
      prd_brand: prd_brand,
    });

    await newProduct.save()
      .then(function () {
        let imgCount = 0;
        let fileName = [];
        for (let obj in req.files) {
          fileName.push(req.files[obj][0].filename);
        }
        (async () => {
          function rename(file, new_name) {
            return new Promise((resolve) => {
              fs.access(new_name, fs.constants.F_OK, (err) => {
                if (err) {
                  return fs.rename(file, new_name, (err) => {
                    resolve();
                  });
                }
                resolve();
              });
            });
          }

          for (let file of fileName) {
            await rename(
              `./src/public/uploads/img/${file}`,
              `./src/public/uploads/img/${prd_id}${(imgCount == 0) ? '' : "_" + imgCount}`);
            imgCount++;
          }
        })();

        res.render("admin/pages/addnew", { layout: "admin", stt: stt });

      })
      .catch(function () {
        stt.err = true;
      });
  };

  //[POST]
  edit(req, res, next) {

  }

  //[POST]
  delete(req, res, next) {

  }
}

module.exports = new ProductController;