const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
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
	},
	passwordConfirm: {
		type: String,
		select: false,
		required: [
        function() {
            return this.isNew || this.isModified('password');
        },
        'Please confirm your password when creating or modifying it.'
    ],
		validate: {
			validator: function(el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!'
		}
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	
	this.password = await bcrypt.hash(this.password, 12);

	this.passwordConfirm = undefined;

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;