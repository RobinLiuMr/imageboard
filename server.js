const express = require('express');
const path = require('path');
const { getImages, createImage } = require('./db');
const { uploader } = require('./uploader');
const { Bucket, s3Upload } = require('./s3');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// upload route
app.post('/upload', uploader.single('file'), s3Upload, (request, response) => {
    const url = `https://s3.amazonaws.com/${Bucket}/${request.file.filename}`;
    console.log('POST /upload', url);

    createImage({
        url,
        ...request.body,
    })
        .then((newImage) => {
            response.json(newImage);
        })
        .catch((error) => {
            console.log('POST /upload', error);
            response.statusCode(500).json({ message: 'error uploading image' });
        });
});
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
    // console.log('images route');
    getImages().then((images) => response.json(images));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// set PORT
const port = process.env.PORT || 1369;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
