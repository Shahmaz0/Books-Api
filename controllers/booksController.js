const Book = require('../models/Book')


exports.addBook = async (req, res) => {
    const { name, category, rentPerDay } = req.body;
    try {
        const newBook = new Book({
            name,
            category,
            rentPerDay
        });
        await newBook.save();
        res.json({ message: "Book added successfully", Book: newBook});
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getBooksByName = async(req, res) => {
    const { term } = req.query;
    try {
        const books = await Book.find({bookName: new RegExp(term, 'i') });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getBooksByRent = async (req, res) => {
    const {minRent, maxRent} = req.query;
    try {
        const books = await Book.find({
            rentPerDay: {$gte: minRent, $lte: maxRent},
        })
        res.json(books);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooksCategoryNameRent = async  (req, res) => {
    const {category, term, minRent, maxRent} = req.query;
    try {
        const books = await Book.find({
            category ,
            bookName: new RegExp(term, 'i'),
            rentPerDay: {$gte: minRent, $lte: maxRent},
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}