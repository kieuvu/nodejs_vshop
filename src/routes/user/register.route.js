const express = require('express');

const router = express.Router();
const registerController = require('../../app/controllers/user/RegisterController.js');
const registerValidate = require('../../app/middlewares/registerValidate');

/***
 *
 * @Router
 *
 */

router.get('/', registerController.index); //Show Register Page
router.post('/create', registerValidate.validate, registerController.create);

module.exports = router;