const express = require('express');
const AppError = require('./utils/AppError')

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Use json for req.body and limitation in 10kb
app.use(express.json({ limit: '10kb' }));

// Set limitation in 100 API requests per 1 hour
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!'
}); 
app.use('/api', limiter);

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
	const error = { ...err };

	if (err.name === 'ValidationError') {
		err = new AppError('Invalid input data.', 400);
		err.status = 'fail';
	}

	if (err.name === 'CastError') {
		err = new AppError(`Invalid ${error.path}: ${error.value}.`, 400);
		err.status = 'fail';
	}

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'production') {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	} else {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			error: err,
			stack: error.stack
		});
	}
});

module.exports = app;
