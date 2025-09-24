const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const { isEmail } = require('validator');


const userSchema = mongoose.Schema({
	role: {
		type: String,
		enum: ['user','admin'],
		default: 'user'
	},
	name: {
		type: String,
		required: [true, 'Provide name!'],
		trim: true
	},
	email: {
		type: String,
		require: [true, 'Provide email!'],
		lowercase: true,
		// validate: {
		// 	validator: isEmail(this.email),
		// 	message: "Providet email is incorrect!"
		// }
	},
	password: {
		type: String,
		required: [true, 'Provide strong password at least 8 chars long!'],
		minlength: 8,
		select: false
	},
	passwordConfirm: {
                type: String,
                required: [true, 'Provide strong passwordConfirmation at least 8 chars long!'],
                minlength: 8,
                select: false,
		validate: {
			validator: function(el) { return (el === this.password)},
			message: "Password not mutch passwordConfirmation"
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

