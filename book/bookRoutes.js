const express = require('express');
const {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    createBookTransaction,
    deleteBookTransaction
} = require('./bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

router.post('/transactions/create', createBookTransaction);
router.post('/transactions/delete', deleteBookTransaction);

module.exports = router;
