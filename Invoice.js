const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customer: String,
  amount: Number,
  items: Array,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
