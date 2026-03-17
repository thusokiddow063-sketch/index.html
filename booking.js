booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  service: String,
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
