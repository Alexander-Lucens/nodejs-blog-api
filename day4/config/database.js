const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const DB_URL = process.env.DB_URL
			.replace('<USER>', process.env.DB_USER)
			.replace('<PASSWORD>', process.env.DB_PASSWORD);

		await mongoose.connect(DB_URL);
		console.log('DB sucesfuly connected!');
	} catch (err) {
		console.error('DB connection fails!', err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
