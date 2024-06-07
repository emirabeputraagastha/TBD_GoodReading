const getAllBooks = 'SELECT * FROM public."Book"';
const getBookById = 'SELECT * FROM public."Book" WHERE "BookNumber" = $1';
const addBook = 'INSERT INTO public."Book" ("BookNumber", "BookName", "PublicationYear", "Pages", "PublisherID") VALUES ($1, $2, $3, $4, $5)';
const updateBook = 'UPDATE public."Book" SET "BookName" = $1, "PublicationYear" = $2, "Pages" = $3, "PublisherID" = $4 WHERE "BookNumber" = $5';
const deleteBook = 'DELETE FROM public."Book" WHERE "BookNumber" = $1';
const createBook = 'INSERT INTO public."Book" ("BookNumber", "BookName", "PublicationYear", "Pages", "PublisherID") VALUES ($1, $2, $3, $4, $5)';
const getBookByName = 'SELECT * FROM public."Book" WHERE "BookName" = $1';

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    createBook,
    getBookByName
}
