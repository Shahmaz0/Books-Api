const express = require('express');
const {getBooksByName, getBooksByRent, getBooksCategoryNameRent, addBook} = require("../controllers/booksController");
const router = express.Router();

router.get('/search', getBooksByName);
router.get('/rent-range', getBooksByRent);
router.get('/filter', getBooksCategoryNameRent);
router.post('/add', addBook);

module.exports = router;