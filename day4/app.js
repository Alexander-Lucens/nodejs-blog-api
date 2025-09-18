const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
// Connect routes but cot use
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

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

// Data sanitization against query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-Site Scripting);
app.use(xss());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
	console.error('ERROR: ', err);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'production') {
		res.status(err.statusCode).json({
			status: err.status,
			message: "Something went wrong!"
		});
	} else {
		res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack
		});
	}
});

module.exports = app;
