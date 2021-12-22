const express = require('express');

const router = express.Router();
const loginController = require('../../app/controllers/user/LoginController');
const loginAuthenticate = require('../../app/middlewares/loginAuthenticate');

/***
 *
 * @Router
 *
 */

router.get("/", loginController.index);
router.post("/auth", loginAuthenticate.authenticate, loginController.redirect);

module.exports = router;
