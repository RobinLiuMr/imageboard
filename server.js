const path = require('path');
const express = require('express');
const app = express();
const { getImages } = require('./db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// images route
// [
//   {
//     id: 1,
//     url: 'https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
//     username: 'funkychicken',
//     title: 'Welcome to Spiced and the Future!',
//     description: 'This photo brings back so many great memories.',
//     created_at: 2022-08-09T12:01:35.213Z
//   },
//   ...
// ]
app.get('/images', (request, response) => {
    console.log('images route');
    getImages().then((images) => response.json(images));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// set PORT
const port = process.env.PORT || 1369;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
