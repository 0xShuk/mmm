const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
    params: {
        type: [Object]
    },
    sig: {
        type: String
    },
    accounts: {
        type: [Object]
    },
    type: {
        type: String
    }
})

const Transaction = mongoose.model("Transaction", txSchema);

module.exports = Transaction;