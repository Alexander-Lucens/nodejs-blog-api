const express = require('express');

const postRouter = require('./routes/postRoutes');

const PORT = process.env.PORT || 1234;
const app = express();

// use это middleware прослойка
// Use postRouter for each API call starting from "/api/posts"
app.use('/api/posts', postRouter);


app.listen(PORT, () => {
	console.log(`Server runs on http://127.0.0.1:${PORT} `);
});
