const express = require('express');
const router = express.Router();

const postController = require('../../app/controllers/user/PostController');

router.get('/', postController.index);
router.get('/getPost', postController.getPost);
router.get('/:id', postController.postDetail);

module.exports = router;