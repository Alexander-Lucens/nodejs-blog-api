// Run only after set data in .env and configurate it with dotenv

const mongoose = require('mongoose');


const connectDB = async () => {
	try {
		const DB_Url =  process.env.DB_URL
			.replace('<USER>', process.env.DB_USER)
			.replace('<PASSWORD>', process.env.DB_PASSWORD);

		await mongoose.connect(DB_Url);
		console.log("DB was successfuly conected!");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
