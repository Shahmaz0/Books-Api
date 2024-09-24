const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User')


exports.issueBook = async (req, res) => {
    const { bookId, userId, issueDate} = req.body;
    try {
        const newTransaction = new Transaction({ bookId, userId, issueDate })
        await newTransaction.save();
        res.json(newTransaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.returnBook = async (req, res) => {
    const { bookId, userId, returnDate} = req.body;
    try {
        const transaction = await Transaction({ bookId, userId, returnDate })
        const daysRented = (new Date(returnDate) - transaction.issueDate) / (1000 * 3600 * 24);
        const book = await Book.findById(bookId);
        transaction.returnDate = returnDate;
        transaction.rent = book.rentPerDay * daysRented;
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
