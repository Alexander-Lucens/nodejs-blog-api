const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	name: {
		type: String,
		required: [true, 'User Must have a name!'],
	},
	email: {
		type: String,
		required: [true, 'User Must have a Email!'],
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: [true, 'User Must have a Password!'],
		minlength: 8,
		select: false
	},
	passwordConfirm: {
                type: String,
                required: [ function() { 
					return (this.isNew || this.isModified('password')) },
					'User Must have a Password!'
				],
				select: false,
				validate: {
					validator: function(el) {
						return (el === this.password);
					},
					message: 'Password are not the same!'
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
