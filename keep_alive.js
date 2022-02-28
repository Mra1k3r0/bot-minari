const express = require('express');
const app = express();

const port = 5000;

app.get('/', (req, res) => res.send('YAHALLO!!'));

app.listen(port, () =>
	console.log(`Your app is listening a http://localhost:${port}`)
);
