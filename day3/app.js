const express = require('express');
const postRoutes = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRouter);

// MIDDLEWARE to catch errors
app.use((err, req, res, next) => {
	console.error('ERROR: ', err);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'fail';
	
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	}); 
});

module.exports = app;