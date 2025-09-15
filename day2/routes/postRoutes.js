const express = require('express');

const postControllers = require('../controllers/postController');

const router = express.Router();

router.route('/')
	.get(postControllers.getAllPosts)
	.post(postControllers.createPost);

router.route('/:id')
	.get(postControllers.getPostById)
	.patch(postControllers.updatePostById)
	.delete(postControllers.deletePostById);

module.exports = router;
