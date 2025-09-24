const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


const createToken = id => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN});
}; 

exports.signup = catchAsync( async(req, res, next) => {
	const newUser = await User.create(req.body);

	if (!newUser) return next(new AppError("User can not be created", 400));

	const token = createToken(newUser._id);

	newUser.password = undefined;
	newUser.passwordConfirm = undefined;

	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser
		}
	});
});


exports.login = catchAsync( async(req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) return next(new AppError("Provide email and password to continue!", 400));

	const user = await User.findOne({email}).select('+password');

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Incorrect email or password!', 401));
	}	
	const token = createToken(user._id);

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

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	
	if (!currentUser) return next(new AppError('User with this token current is not exist.', 401));

	req.user = currentUser;

	next();
});
