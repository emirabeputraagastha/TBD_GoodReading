// src/wishlist/wishlistQueries.js

const getAllWishlists = 'SELECT * FROM public."Wishlist"';
const getWishlistById = 'SELECT * FROM public."Wishlist" WHERE "WishlistID" = $1';
const addWishlist = 'INSERT INTO public."Wishlist" ("WishlistID", "UserID", "BookNumber") VALUES ($1, $2, $3)';
const updateWishlist = 'UPDATE public."Wishlist" SET "UserID" = $1, "BookNumber" = $2 WHERE "WishlistID" = $3';
const deleteWishlist = 'DELETE FROM public."Wishlist" WHERE "WishlistID" = $1';
const createWishlist = 'INSERT INTO public."Wishlist" ("WishlistID", "UserID", "BookNumber") VALUES ($1, $2, $3)';

module.exports = {
    getAllWishlists,
    getWishlistById,
    addWishlist,
    updateWishlist,
    deleteWishlist,
    createWishlist
};
