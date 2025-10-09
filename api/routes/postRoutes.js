const express = require('express');
const postControllers = require('../controllers/postControllers');
const routes = express.Router();

const { protect } = require('../controllers/authControllers');

routes.route('/')
	.get(postControllers.getAllPosts)
	.post( protect, postControllers.createPost);

routes.route('/:id')
	.get( postControllers.getPostById)
	.patch( protect, postControllers.updatePostById)
	.delete( protect, postControllers.deletePostById);

module.exports = routes;
