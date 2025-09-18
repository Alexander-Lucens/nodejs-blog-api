const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { validate } = require('../models/postModel');

const signToken = id => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
};

exports.signup = catchAsync( async (req, res, next) => {
	const newUser = await User.create(req.body);

	newUser.password = undefined;
	newUser.passwordConfirm = undefined;

	const token = signToken(newUser._id);

	res.status(201).json({
		status: 'success',
		token,
		data: newUser
	});
});

exports.login = catchAsync( async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) return next(new AppError('Please provide email and password!', 400));

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Incorrect email or password!', 401));
	}

	const token = signToken(user._id);

	res.status(200).json({
		status: 'success',
		token
	});
});

exports.protect = catchAsync( async (req, res, next) => {

	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('You are not logged in!', 401));
	}

	const decodedUser = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decodedUser.id);

	if (!currentUser) return next(new AppError('User with this token current is not exist.', 401));

	req.user = currentUser;

	next();
});
