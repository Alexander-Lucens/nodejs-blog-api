const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 1234;

const DB = process.env.DB_URL
		.replace('<USER>', process.env.DB_USER)
		.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('Database connected sucessfuly!'));

const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
	console.error('💥 ERROR:', err);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		stasus: err.status,
		message: err.message
	});
});

app.listen(PORT, () => {
	console.log(`App runing at http://127.0.0.1:${PORT}`);
});
