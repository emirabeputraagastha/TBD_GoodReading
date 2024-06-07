const express = require('express');
const {
    getPublishers,
    getPublisherById,
    addPublisher,
    updatePublisher,
    deletePublisher,
    createPublisherTransaction,
    deletePublisherTransaction
} = require('./publisherController');

const router = express.Router();

router.get('/', getPublishers);
router.get('/:id', getPublisherById);
router.post('/', addPublisher);
router.put('/:id', updatePublisher);
router.delete('/:id', deletePublisher);

router.post('/transactions/create', createPublisherTransaction);
router.post('/transactions/delete', deletePublisherTransaction);
module.exports = router;
