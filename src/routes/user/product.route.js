const express = require('express');

const router = express.Router();

const productController = require('../../app/controllers/user/ProductController');
const cartController = require('../../app/controllers/user/CartController');
const orderedController = require('../../app/controllers/user/OrderedController');
const preventAccess = require('../../app/middlewares/preventAccess');


/***
 *
 * @Router
 *
 */

// Show All Product Page
router.get('/', productController.index);
// Show Cart Page
router.get('/cart', cartController.index);
// Add Product To Cart
router.post('/cart', cartController.add);
// Decrease Cart Product
router.post('/cart/decrease', cartController.decrease);
// Delete Cart Product
router.post('/cart/delete', cartController.delete);
// Checkout
router.post('/cart/checkout', cartController.checkout);
// Cancel Ordered
router.post('/ordered/updateState', orderedController.updateState);
// Show Product Ordered Page
router.get('/ordered', preventAccess.requireSign, orderedController.userIndex);
// Show Search Page
router.get('/search', productController.search);
// Show Detail Product Page
router.get('/:id', productController.detail);

module.exports = router;