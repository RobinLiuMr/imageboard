const express = require('express');
const path = require('path');
const {
    getImages,
    createImage,
    getCommentsByImageId,
    createComment,
    getImageByImageId,
    getMoreImages,
} = require('./db');
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
app.get('/images', (request, response) => {
    console.log('images route');
    getImages().then((images) => response.json(images));
});

app.get('/images/:image_id/', (request, response) => {
    console.log('image by image_id route');
    getImageByImageId(request.params.image_id).then((image) =>
        response.json(image)
    );
});

app.get('/more-images', (request, response) => {
    console.log('more images');

    getMoreImages({ ...request.query }).then((images) => response.json(images));
});

// comments route
app.get('/images/:image_id/comments', (request, response) => {
    console.log('comments route: GET');
    // console.log(request.params.image_id);
    getCommentsByImageId(request.params.image_id).then((comments) =>
        response.json(comments)
    );
});

app.post('/images/:image_id/comments', (request, response) => {
    console.log('comments route: POST');
    createComment({
        ...request.body,
        ...request.params,
    }).then((newComment) => {
        response.json(newComment);
    });
});

// serve everything-- in the end!
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// set PORT
const port = process.env.PORT || 1369;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
