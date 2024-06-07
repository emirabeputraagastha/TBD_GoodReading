// src/book/bookController.js

const pool = require('../db');
const queries = require('./bookQueries');

const getBooks = (req, res) => {
    pool.query(queries.getAllBooks, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getBookById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getBookById, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).json(results.rows[0]);
        }
    });
};

const addBook = (req, res) => {
    const { BookNumber, BookName, PublicationYear, Pages, PublisherID } = req.body;
    pool.query(queries.addBook, [BookNumber, BookName, PublicationYear, Pages, PublisherID], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(201).json(results.rows[0]);
        }
    });
};

const updateBook = (req, res) => {
    const bookNumber = req.params.id;
    const { BookName, PublicationYear, Pages, PublisherID } = req.body;
    pool.query(queries.updateBook, [BookName, PublicationYear, Pages, PublisherID, bookNumber], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).send('Book updated successfully');
        }
    });
};

const deleteBook = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deleteBook, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).send('Book deleted successfully');
        }
    });
};

const createBookTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { books } = req.body;

        for (const book of books) {
            const { BookNumber, BookName, PublicationYear, Pages, PublisherID } = book;
            const values = [BookNumber, BookName, PublicationYear, Pages, PublisherID];
            await client.query(queries.createBook, values);
        }

        await client.query('COMMIT');

        res.status(200).json({ message: "Transaction completed successfully" });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
};

const deleteBookTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { bookNumbers } = req.body;

        for (const BookNumber of bookNumbers) {
            await client.query(queries.deleteBook, [BookNumber]);
        }

        await client.query('COMMIT');

        res.status(200).json({ message: "Delete transaction completed successfully" });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
};

const getBookByName = (req, res) => {
    const BookName = req.query.BookName; // Ubah sesuai dengan nama properti yang Anda gunakan di body request
    pool.query(queries.getBookByName, [BookName], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    createBookTransaction,
    deleteBookTransaction,
    getBookByName
};
