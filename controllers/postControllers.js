const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');


exports.createPost = catchAsync ( async (req, res, next) => {
	const newPost = await Post.create(req.body);

	if (!newPost) return next(new AppError('Post cant be created!', 400));

	res.status(201).json({
		status: 'success',
		data: newPost
	});
});

exports.getAllPosts = catchAsync( async (req, res, next) => {
	const queryFeature = new APIFeatures(Post.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate()

	const posts = await queryFeature.query;

	res.status(200).json({
                status: 'success',
                data: posts
        });
});


exports.getPostById = catchAsync( async (req, res, next) => {
	const id = req.params.id;
	
	const post = await Post.findById(id);

	if (!post) return next(new AppError('Post not found!', 404));

	res.status(200).json({
                status: 'success',
                data: post
        });
});

exports.updatePostById = catchAsync( async (req, res, next) => {
	const id = req.params.id;

	const post = await Post.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true
	});

        if (!post) return next(new AppError('Post not found!', 404));
	
	res.status(200).json({
                status: 'success',
                data: post
        });
});

exports.deletePostById = catchAsync( async (req, res, next) => {
        const id = req.params.id;

	const post = await Post.findByIdAndDelete(id);

        if (!post) return next(new AppError('Post not found!', 404));

        res.status(204).json({ });
});
