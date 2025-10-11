const dotenv = require('dotenv');

const connectDB = require('./config/database');

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 1234;

const app = require('./app.js');

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT);
		console.log(`Server run on http://127.0.0.1:${PORT}`);
	} catch (err) {
		console.error('Fail while try to run server!', err.message);
		process.exit(1);
	}
};

startServer();
