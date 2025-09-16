const connectDB = require('./config/database.js');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;
const app = require('./app');

const startServer = async () => {
	await connectDB();
		
	app.listen(PORT, () => {
		console.log(`Server runs on htttp://127.0.0.1:${PORT}`);
	});
};

startServer();
