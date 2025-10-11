const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = mongoose.Schema({
	projects: [
		{
			project: {
				type: mongoose.Schema.ObjectId,
				ref: 'Project'
			},
			role: {
				type: String,
				enum: ['owner', 'moder', 'plebs'],
				default: 'plebs'
			}
		}
	],
	globalPermission: {
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
		required: [true, 'Provide email!'],
		lowercase: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "Providet email is incorrect!"
		}
	},
	password: {
		type: String,
		required: [true, 'Provide strong password at least 8 chars long!'],
		minlength: 8,
		select: false
	},
	passwordConfirm: {
                type: String,
                required: [true, 'Please confirm your password!'],
                minlength: 8,
                select: false,
		validate: {
			validator: function(el) { return (el === this.password)},
			message: "Password do not match!"
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

