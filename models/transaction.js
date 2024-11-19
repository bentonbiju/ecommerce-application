const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  product_uuid: {
    type: String, // UUID of the product being bid on
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  bid_price: {
    type: Number, // The bid price that was placed
    required: true,
  },
  transaction_date: {
    type: Date, // Date when the transaction was made
    default: Date.now, // Automatically set to the current date/time
  }
});

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;