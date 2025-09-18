const express = require('express');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
	console.error('ERROR: ', err);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	});
});

module.exports = app;
