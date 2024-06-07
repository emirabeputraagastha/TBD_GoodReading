const pool = require('../db');
const queries = require('./wishlistQueries');

const getAllWishlists = (req, res) => {
    pool.query(queries.getAllWishlists, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getWishlistById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getWishlistById, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
            res.status(404).send('Wishlist not found');
        } else {
            res.status(200).json(results.rows[0]);
        }
    });
};

const addWishlist = (req, res) => {
    const { WishlistID, UserID, BookNumber } = req.body;
    pool.query(queries.addWishlist, [WishlistID, UserID, BookNumber], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(201).json(results.rows[0]);
        }
    });
};

const updateWishlist = (req, res) => {
    const wishlistId = req.params.id;
    const { UserID, BookNumber } = req.body;
    pool.query(queries.updateWishlist, [UserID, BookNumber, wishlistId], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Wishlist not found');
        } else {
            res.status(200).send('Wishlist updated successfully');
        }
    });
};

const deleteWishlist = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deleteWishlist, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (results.rowCount === 0) {
            res.status(404).send('Wishlist not found');
        } else {
            res.status(200).send('Wishlist deleted successfully');
        }
    });
};

const createWishlistTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { wishlists } = req.body;

        for (const wishlist of wishlists) {
            const { WishlistID, UserID, BookNumber } = wishlist;
            const values = [WishlistID, UserID, BookNumber];
            await client.query(queries.createWishlist, values);
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

const deleteWishlistTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { wishlistIDs } = req.body;

        for (const WishlistID of wishlistIDs) {
            await client.query(queries.deleteWishlist, [WishlistID]);
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
    getAllWishlists,
    getWishlistById,
    addWishlist,
    updateWishlist,
    deleteWishlist,
    createWishlistTransaction,
    deleteWishlistTransaction
};
