const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Post title can\'t be empty!'],
		trim: true
	},
	body: {
		type: String,
		required: [true, 'Post body can\'t be empty!']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
