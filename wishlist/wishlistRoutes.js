const express = require('express');
const {
    getAllWishlists,
    getWishlistById,
    addWishlist,
    updateWishlist,
    deleteWishlist,
    createWishlistTransaction,
    deleteWishlistTransaction
} = require('./wishlistController');

const router = express.Router();

router.get('/', getAllWishlists);
router.get('/:id', getWishlistById);
router.post('/', addWishlist);
router.put('/:id', updateWishlist);
router.delete('/:id', deleteWishlist);

router.post('/transactions/create', createWishlistTransaction);
router.post('/transactions/delete', deleteWishlistTransaction);

module.exports = router;
