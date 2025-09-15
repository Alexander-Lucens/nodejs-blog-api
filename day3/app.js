const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

const app = express();

const DB_URL = process.env.DB_URL
		.replace('<USER>', process.env.DB_USER)
		.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB_URL).then(() => console.log('DB sucesfuly connected!'));
 
const postRoutes = require('./routes/postRoutes');

const userRouter = require('./routes/userRoutes');

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

app.listen(PORT, () => {
	console.log(`Server run on http://127.0.0.1:${PORT}`);
});
