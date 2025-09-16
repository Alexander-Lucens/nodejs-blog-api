const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync( async (req, res, next) => {
	const newPost = await Post.create(req.body);
	
	res.status(201).json({
		status: 'success',
		data: newPost	
	});	
});

exports.getAllPosts = catchAsync( async (req, res, next) => {
	
	// const feature = APIFeature(Post.find(), req.qury).filter().sort().fields().paginate();
	// const posts await feature.query;

	const posts = await Post.find();
	
	res.status(200).json({
                status: 'success',
		size: posts.length,
                data: posts
        });
});

exports.getPostById = catchAsync( async (req, res, next) => {

	const post = await Post.findById(req.params.id);

	if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!'}));

	res.status(200).json({
                status: 'success',
                data: post
        });
});

exports.updatePostById = catchAsync( async (req, res, next) => {
	const post = await Post.findByIdAndUpdate(req.params.id);

        if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!'}));

        res.status(200).json({
                status: 'success',
                data: post
        });
});

exports.deletePostById = catchAsync( async (req, res, next) => {
	const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!'}));

        res.status(204).json({});
});
