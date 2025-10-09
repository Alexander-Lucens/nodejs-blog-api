const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Post must have title!"],
		trim: true
	},
	body: {
		type: String,
		required: [true, "Post must have Body!"]
	},
	author: {
		type: String,
		required: [true, "Please set Author!"]
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
