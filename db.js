// connect with database imageboard
const spicedPg = require('spiced-pg');
const { DATABASE_USER, DATABASE_PASSWORD } = require('./secrets.json');
const DATABASE_NAME = 'imageboard';

const db = spicedPg(
    `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
);

// function to get all comments by image_id
function getCommentsByImageId(image_id) {
    return db
        .query(
            `
            SELECT * FROM comments
            WHERE image_id = $1
        `,
            [image_id]
        )
        .then((result) => result.rows);
}

// function to create a new comment
// imageboard=# SELECT * FROM comments;
//  id | username | image_id | text | created_at
// ----+----------+----------+------+-----------
function createComment({ text, username, image_id }) {
    return db
        .query(
            `INSERT INTO comments (text, username, image_id) 
            VALUES ($1, $2, $3)

        `,
            [text, username, image_id]
        )
        .then((result) => result.rows[0]);
}

// function to get all the images
function getImages() {
    return db
        .query(
            `
        SELECT * FROM images
        ORDER BY id DESC
        LIMIT 3
        `
        )
        .then((result) => result.rows);
}

// more images
function getMoreImages({ limit, lastID }) {
    return db
        .query(
            `
        SELECT * FROM images
        WHERE id < $2
        ORDER BY id DESC        
        LIMIT $1
        
        `,
            [limit, lastID]
        )
        .then((result) => result.rows);
}

// function to get a image by image ID

function getImageByImageId(id) {
    return db
        .query(
            `
            SELECT * FROM images
            WHERE id = $1
        `,
            [id]
        )
        .then((result) => result.rows[0]);
}

// function to create image
function createImage({ url, username, title, description }) {
    return db
        .query(
            `INSERT INTO images (url, username, title, description) 
            VALUES ($1, $2, $3, $4)

        `,
            [url, username, title, description]
        )
        .then((result) => result.rows[0]);
}

module.exports = {
    getImages,
    createImage,
    getCommentsByImageId,
    createComment,
    getImageByImageId,
    getMoreImages,
};
