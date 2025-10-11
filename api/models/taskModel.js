const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "A task must have a title!"],
		trim: true
	},
	description: String,
	status: {
		type: String,
		enum: ['backlog', 'todo', 'inProgress', 'done'],
		default: 'backlog'
	},
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low'
	},
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Project',
		required: [true, 'A task must belong to a project.']
	},
	assignee: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
