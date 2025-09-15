
const posts = [
		{ id: 1, title: 'Post 1', body: 'This is the body and hope somebody see me'},
		{ id: 2, title: 'Post 2', body: 'This is the body and hope somebody see me'},
		{ id: 3, title: 'Post 3', body: 'This is the body and hope somebody see me'},
		{ id: 4, title: 'Post 4', body: 'This is the body and hope somebody see me'},
		{ id: 5, title: 'Post 5', body: 'This is the body and hope somebody see me'},
		{ id: 6, title: 'Post 6', body: 'This is the body and hope somebody see me'},
		{ id: 7, title: 'Post 7', body: 'This is the body and hope somebody see me'},
		{ id: 8, title: 'Post 8', body: 'This is the body and hope somebody see me'},
		{ id: 9, title: 'Post 9', body: 'This is the body and hope somebody see me'},
		{ id: 10, title: 'Post 10', body: 'This is the body and hope somebody see me'},
		{ id: 11, title: 'Post 11', body: 'This is the body and hope somebody see me'},
		{ id: 12, title: 'Post 12', body: 'This is the body and hope somebody see me'}
];

exports.getAllPosts = (req, res) => {	
	res.status(200).json({
		status: 'success',
		result: posts.length,
		data: {
			posts
		}
	});

};


// Here before changes

exports.getPostById = (req, res) => {
	
	const searchedId = Number(req.params.id);
	console.log(`ID Looking for ${searchedId}`);
	const post = posts.find((item) => item.id === searchedId );
	if (post.length === 0) {
		return (res.status(404).json({ status: 'fail', message: 'Post not found!' }));
	}
	res.status(200)
		.json({
			status: 'success',
			data: { post }
	});
};
