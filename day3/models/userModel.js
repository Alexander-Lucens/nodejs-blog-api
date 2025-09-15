const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'User must have a name!']
	},
	email: {
		type: String,
		required: [true, 'User must have Email!'],
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: [true, 'Please provide password!'],
		minlength: 8,
		select: false
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;