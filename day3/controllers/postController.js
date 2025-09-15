const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');

exports.createPost = catchAsync( async (req, res, next) => {

	const post = await Post.create(req.body);

        res.status(201).json({
                status: 'success',
                data: post
        });
});

exports.getAllPosts = catchAsync( async (req, res, next) => {
	// For begining without filtration then after implementation of APIFeatures use it instead
	// const posts = await Post.find();
	
	const feature = new APIFeatures(Post.find(), req.query).filter().sort().fields().paginate();

	const posts = await feature.query;

	res.status(200).json({
		status: 'success',
		size: posts.length,
		data: posts
	});
});


exports.getPostById = catchAsync( async (req, res, next) => {

	const post = await Post.findById(req.params.id);

	if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!' }));

	res.status(200).json({
			status: 'success',
			data: post
	});
});

exports.updatePostById = catchAsync( async (req, res, next) => {

	const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	
	if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!' }));

	res.status(200).json({
			status: 'success',
			data: post
	});
});

exports.deletePostById = catchAsync( async (req, res, next) => {

	const post = await Post.findByIdAndDelete(req.params.id);

	if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!' }));

    res.status(204).json({});
});

