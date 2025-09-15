const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'A post title can\'t be empty'],
		trim: true
	},
	body: {
		type: String,
		required: [true, 'A post body can\'t be empty'],
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
