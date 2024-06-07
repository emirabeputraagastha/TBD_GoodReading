// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./book/bookRoutes');
const wishlistRoutes = require('./wishlist/wishlistRoutes');
const publisherRoutes = require('./publisher/publisherRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/publishers', publisherRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});