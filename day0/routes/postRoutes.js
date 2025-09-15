const express = require('express');
const postController = require('../controllers/postController');


// Специальный метод .Router() который помогает группировать связанные маршруты

const router = express.Router();

router.route('/')
	.get(postController.getAllPosts);

router.route('/:id')
	.get(postController.getPostById);


module.exports = router;
