// src/publisher/publisherController.js

const pool = require('../db');
const queries = require('./publisherQueries');

const getPublishers = (req, res) => {
    pool.query(queries.getAllPublishers, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getPublisherById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getPublisherById, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
            res.status(404).send('Publisher not found');
        } else {
            res.status(200).json(results.rows[0]);
        }
    });
};

const addPublisher = (req, res) => {
    const { PublisherID, PublisherName, City, Country, Telephone, YearFounded } = req.body;
    pool.query(queries.addPublisher, [PublisherID, PublisherName, City, Country, Telephone, YearFounded], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(201).json(results.rows[0]);
        }
    });
};

const updatePublisher = (req, res) => {
    const publisherId = req.params.id;
    const { PublisherName, City, Country, Telephone, YearFounded } = req.body;

    pool.query(queries.updatePublisher, [PublisherName, City, Country, Telephone, YearFounded, publisherId], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Publisher not found');
        } else {
            res.status(200).send('Publisher updated successfully');
        }
    });
};

const deletePublisher = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deletePublisher, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Publisher not found');
        } else {
            res.status(200).send('Publisher deleted successfully');
        }
    });
};

const createPublisherTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { publishers } = req.body;

        for (const publisher of publishers) {
            const { PublisherID, PublisherName, City, Country, Telephone, YearFounded } = publisher;
            const values = [PublisherID, PublisherName, City, Country, Telephone, YearFounded];
            await client.query(queries.createPublisher, values);
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

const deletePublisherTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { publisherIDs } = req.body;

        for (const PublisherID of publisherIDs) {
            await client.query(queries.deletePublisher, [PublisherID]);
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

module.exports = {
    getPublishers,
    getPublisherById,
    addPublisher,
    updatePublisher,
    deletePublisher,
    createPublisherTransaction,
    deletePublisherTransaction
};
