
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
		size: posts.length,
		data: posts
	});	
};


exports.getPostById = (req, res) => {
	const NID = Number(req.params.id);
	const post = posts.find(item => item.id === NID);
	if (!post) return (res.status(404).json({ status: 'fail', message: 'Post not found!'}));
	res.status(200).json({
                status: 'success',
                data: post
        });
};

exports.createPost = (req, res) => {
	if (!res.body) return (res.status(404).json({ status: 'fail', message: 'Post req is empty!'}));
	const newPost = { id: posts[posts.length - 1] + 1, title: req.body.title, body: req.body.body };	
	posts.push(newPost);

	res.status(201).json({
                status: 'success',
                data: newPost
        });
};
