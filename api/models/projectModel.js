const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A project must have a name."],
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, "A project must have an owner."]
	},
	members: [
		{
			member: {
				type: mongoose.Schema.ObjectId,
				ref: 'User'
			},
			role: {
				type: String,
				enum: ['moder', 'plebs']
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
