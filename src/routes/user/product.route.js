const express = require('express');

const router = express.Router();
const productController = require('../../app/controllers/user/ProductController');
const cartController = require('../../app/controllers/user/CartController');


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
// Show Detail Product Page
router.get('/:id', productController.detail);

module.exports = router;