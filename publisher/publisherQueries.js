const getAllPublishers = 'SELECT * FROM public."Publisher"';
const getPublisherById = 'SELECT * FROM public."Publisher" WHERE "PublisherID" = $1';
const addPublisher = 'INSERT INTO public."Publisher" ("PublisherID", "PublisherName", "City", "Country", "Telephone", "YearFounded") VALUES ($1, $2, $3, $4, $5, $6)';
const updatePublisher = 'UPDATE public."Publisher" SET "PublisherName" = $1, "City" = $2, "Country" = $3, "Telephone" = $4, "YearFounded" = $5 WHERE "PublisherID" = $6';
const deletePublisher = 'DELETE FROM public."Publisher" WHERE "PublisherID" = $1';
const searchPublishers = 'SELECT * FROM public."Publisher" WHERE "PublisherName" ILIKE $1';

const createPublisher = 'INSERT INTO public."Publisher" ("PublisherID", "PublisherName", "City", "Country", "Telephone", "YearFounded") VALUES ($1, $2, $3, $4, $5, $6)';

module.exports = {
    getAllPublishers,
    getPublisherById,
    addPublisher,
    updatePublisher,
    deletePublisher,
    createPublisher,
    searchPublishers
};
