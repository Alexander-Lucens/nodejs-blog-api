const connectDB = require('./config/database');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;
const app = require('./app');

const startServer = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server run on http://127.0.0.1:${PORT}`);
	});
};

startServer();