const AppError = (message, statusCode) => {
		let custError = new Error(message);
		custError.statuscode = statusCode;
		return custError;
};

module.exports = AppError;