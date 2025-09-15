const express = require('express');
const PORT = process.env.PORT || 1234;
const app = express();
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use('/', postRoutes);


app.listen(PORT, () => {
	console.log(`Server runs, to open: http://127.0.0.1:${PORT} `);
});
