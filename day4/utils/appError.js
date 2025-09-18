class AppError {
	constructor(message, errorCode) {
		const newError = new Error(message);
		newError.status = errorCode;
		return newError;
	}
}

module.exports = AppError;