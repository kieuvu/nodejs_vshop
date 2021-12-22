const express = require('express');

const router = express.Router();
const logoutController = require('../../app/controllers/user/LogoutController');

/***
 *
 * @Router
 *
 */

router.get('/', logoutController.logout);

module.exports = router;