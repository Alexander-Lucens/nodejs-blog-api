class AppError {
	constructor(message, statusCode) {
		let newError = new Error(message);
		newError.statusCode = statusCode;
		return newError;
	};
};

module.exports = AppError;
