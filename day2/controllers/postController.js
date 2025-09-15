
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');

const APIFeatures = require('../utils/apiFeatures');

// Exactly here is CRUD 

// Read section

exports.getAllPosts = catchAsync( async (req, res) => {
	
	const feature = new APIFeatures(Post.find(), req.query)
		.filter().sort().limitFields().paginate();
	
	const posts = await feature.query;

	res.status(200).json({
		status: 'success',
		size: posts.length,
		data: posts
	});
});

exports.getPostById = catchAsync( async (req, res) => {
	
	const post = await Post.findById(req.params.id);
	
	if (!post) return (res.status(404).json({status: 'fail', message: 'Post not found!'}));
	
	res.status(200).json({
		status: 'success',
		data: post
	});
});

// Create section

exports.createPost = catchAsync( async (req, res) => {
	
	const newPost = await Post.create(req.body)

	res.status(201).json({
		status: 'success',
		data: newPost
	});

});

// Update section

exports.updatePostById = catchAsync( async (req, res) => {
	const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValudators: true
	});
	
	if (!post) return (res.status(404).json({status: 'fail', message: 'Post not found!'}));
	
 	res.status(200).json({
		status: 'success',
		data: post
	});
});

// Delete section

exports.deletePostById = catchAsync( async (req, res) => {

	const post = await Post.findByIdAndDelete(req.params.id);

	if (!post) return (res.status(404).json({status: 'fail', message: 'Post not found!'}));

	res.status(204).json();
});




