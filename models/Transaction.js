const mongoose = require('mongoose')

const transactionModel = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true } ,
    issueDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    rent: { type: Number },
})

module.exports = mongoose.model('Transaction', transactionModel);