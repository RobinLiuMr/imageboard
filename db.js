// connect with database imageboard
const spicedPg = require('spiced-pg');
const { DATABASE_USER, DATABASE_PASSWORD } = require('./secrets.json');
const DATABASE_NAME = 'imageboard';

const db = spicedPg(
    `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
);

// build a function to get all the images
// imageboard=# SELECT * FROM images;
//  id |                                   url                                    |   username   |               title               |                  description                   |         created_at
// ----+--------------------------------------------------------------------------+--------------+-----------------------------------+------------------------------------------------+----------------------------

function getImages() {
    return db
        .query('SELECT * FROM images')
        .then((result) => result.rows)

        .catch((err) => console.log(err));
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

module.exports = { getImages, createImage };
