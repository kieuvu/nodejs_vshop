const express = require('express');
const router = express.Router();
const { trim_all } = require('request_trimmer');

const dashboardController = require("../../app/controllers/admin/DashboardController");
const productController = require("../../app/controllers/admin/ProductController");
const cateBrandController = require('../../app/controllers/admin/CateBrandController');
const userController = require('../../app/controllers/admin/UserController');
const orderedController = require("../../app/controllers/user/OrderedController");
const postController = require('../../app/controllers/admin/PostController');

const productValidate = require('../../app/middlewares/productValidate');
const checkCateBrand = require('../../app/middlewares/checkCateBrand');

const imageUpload = require("../../ultis/product/multerConfig");

/***
 *
 *@Router
 *
 ***/

/**@Dashboard DONE*/

// Show Dashboard Page
router.get('/', dashboardController.index);
router.get('/getAnalytics', dashboardController.getAnalytics);

/**@Product DONE*/

// Show Product Manager Page
router.get('/product', productController.index);

// Show Create Product Page
router.get('/product/add', productController.create);

// API: Get Product
router.get('/product/getproduct', productController.getProduct);

// API: Show Edit Page
router.get('/product/edit/:id', productController.edit);

// API: Create New Product
router.post('/product/add', imageUpload, trim_all, productValidate.getProductId, productController.add);

// API: Create Update Product
router.patch('/product/update', imageUpload, trim_all, productController.updateProduct);

// API: Delete Product
router.delete('/product/delete', productController.delete);

/**@CateBrand DONE */

// Show Index Category & Brand Page
router.get('/product/catebrand', cateBrandController.showCateBrand);

// API: Get All Categories & Brands
router.get('/product/catebrand/getall', cateBrandController.getAll);

// API: Create New Category or Brand
router.post('/product/catebrand/add', checkCateBrand.exist, cateBrandController.add);

// API: Delete Category or Brand
router.delete('/product/catebrand/delete', cateBrandController.delete);

/**@User DONE */

// Show User Page
router.get('/user', userController.index);

// API: Get All User
router.get('/user/get', trim_all, userController.getUser);

// API: Delete User
router.delete('/user/delete', userController.deleteUser);

// API: Update User
router.patch('/user/update', userController.updateUser);

/**@Ordered DONE*/

// Show Ordered Page
router.get('/ordered', orderedController.index);

// API: Get All Ordered
router.get('/ordered/getOrder', orderedController.getOrder);

// API: Update Ordered State
router.post('/ordered/updateState', orderedController.updateState);

/**@POST DONE*/

// Show All Post Page
router.get('/post', postController.index);

// Show Add New Post Page
router.get('/post/create', postController.create);

// API: Add New Post
router.post('/post/create/add', postController.add);

// API: Get All Post
router.get('/post/getPost', postController.getAll);

// Show Post Edit Page
router.get('/post/edit/:id', postController.edit);

// API: Update Post
router.post('/post/update', postController.update);

// API: Delete Post
router.delete('/post/delete', postController.delete);

module.exports = router;
