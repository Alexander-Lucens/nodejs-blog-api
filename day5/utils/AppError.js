class AppError {
	constructor(message, statusCode) {
		let newError = new Error(message);
		newError.status = statusCode;
		return newError;
	};
};

module.exports = AppError;
