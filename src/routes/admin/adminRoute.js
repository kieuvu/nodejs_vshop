const express = require('express');
const router = express.Router();
const dashboardController = require("../../app/controllers/admin/DashboardController");
const productController = require("../../app/controllers/admin/ProductController");
const productValidate = require('../../app/middlewares/productValidate');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/public/uploads/img/');
  },
});

const upload = multer({
  storage: storage,
});

const imageUpload = upload.fields([
  { name: 'prd_stImg', maxCount: 1 },
  { name: 'prd_scImg', maxCount: 1 },
  { name: 'prd_rdImg', maxCount: 1 },
  { name: 'prd_thImg', maxCount: 1 },
]);

router.get('/', dashboardController.index);

router.get('/product', productController.index);
router.get('/product/add', productController.create);
router.post('/product/add', imageUpload, productValidate.getProductId, productController.add);

module.exports = router;
