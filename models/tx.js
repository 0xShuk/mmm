const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
    token: {
        type: String
    }
    // params: {
    //     type: [Object]
    // },
    // sig: {
    //     type: String
    // },
    // accounts: {
    //     type: [Object]
    // },
    // type: {
    //     type: String
    // }
})

const Transaction = mongoose.model("Transaction", txSchema);

module.exports = Transaction;