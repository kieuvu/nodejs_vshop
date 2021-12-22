const fs = require('fs');
const fsprm = require('fs').promises;
const Product = require("../../models/product.model");

class ProductController {
  //[GET]
  index(req, res, next) {
    res.render("admin/pages/allproduct", { layout: "admin" });
  }

  //[GET]
  async getProduct(req, res, next) {
    let query = [];

    if (req.query.search_name) {
      let prd_name = req.query.search_name;
      if (prd_name.length > 0) {
        query.push({ 'prd_name': new RegExp(prd_name, 'i') });
      }
    }
    if (req.query.prd_brand) {
      let prd_brand = req.query.prd_brand;
      if (prd_brand != 'all') {
        query.push({ prd_brand: prd_brand });
      }
    }
    if (req.query.prd_cate) {
      let prd_cate = req.query.prd_cate;
      if (prd_cate != 'all') {
        query.push({ prd_cate: prd_cate });
      }
    }
    if (req.query.prd_id) {
      let prd_id = req.query.prd_id;
      if (prd_id.length > 0) {
        query.push({ prd_id: prd_id });
      }
    }

    const finnal = { ...query[0], ...query[1], ...query[2], ...query[3] };

    await Product.find(finnal).sort({ prd_name: 1 })
      .then((products) => {
        res.json(products);
      });
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

    const { prd_name, prd_id, prd_desc, prd_price,
      prd_cate, prd_brand, prd_quantity, prd_chip,
      prd_ram, prd_rom, prd_display, prd_os,
      prd_camera, prd_battery, prd_gcard } = req.body;

    const newProduct = new Product({
      prd_name, prd_id, prd_desc, prd_price, prd_cate,
      prd_brand, prd_quantity, prd_chip, prd_ram,
      prd_rom, prd_display, prd_os, prd_camera,
      prd_battery, prd_gcard,
    });

    await newProduct.save()
      .then(() => {
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

        res.json(stt);

      })
      .catch(() => {
        stt.err = true;
      });
  };

  //[GET]
  edit(req, res, next) {
    res.render('admin/pages/editProduct', { layout: "admin" });
  }

  //[PATCH]
  async updateProduct(req, res, next) {
    const stt = {
      err: false
    };

    let index = 0;

    const { prd_name, prd_id, prd_priceSaled, prd_desc, prd_price,
      prd_cate, prd_brand, prd_quantity, prd_chip,
      prd_ram, prd_rom, prd_display, prd_os,
      prd_camera, prd_battery, prd_gcard, } = req.body;

    await Product.updateOne(
      { prd_id: prd_id },
      {
        prd_name, prd_id, prd_priceSaled, prd_desc, prd_price,
        prd_cate, prd_brand, prd_quantity, prd_chip, prd_ram,
        prd_rom, prd_display, prd_os, prd_camera,
        prd_battery, prd_gcard,
      }
    )
      .then(() => {
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

          for (let obj in req.files) {
            if (typeof req.files[obj] !== 'undefined') {
              await fsprm.unlink(`./src/public/uploads/img/${prd_id}${(index == 0) ? "" : "_" + index}`);
              await rename(
                `./src/public/uploads/img/${req.files[obj][0].filename}`,
                `./src/public/uploads/img/${prd_id}${(index == 0) ? "" : "_" + index}`);
            }
            index++;
          }
        })();

        res.json(stt);

      })
      .catch(() => {
        stt.err = true;
      });

  }

  //[DELETE]
  async delete(req, res, next) {
    const stt = {
      err: false
    };

    const id = req.body.id;

    await Product.deleteOne({ prd_id: id })
      .then(async () => {
        await Promise.all([
          fsprm.unlink(`./src/public/uploads/img/${id}`),
          fsprm.unlink(`./src/public/uploads/img/${id}_1`),
          fsprm.unlink(`./src/public/uploads/img/${id}_2`),
          fsprm.unlink(`./src/public/uploads/img/${id}_3`),
        ]).then(() => {
          res.json(stt);
        });
      });
  }
}

module.exports = new ProductController;