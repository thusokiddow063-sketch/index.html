// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import models
const Booking = require('./models/Booking');
const Customer = require('./models/Customer');
const Invoice = require('./models/Invoice');

// Admin credentials
const ADMIN = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

// Middleware: verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
}

// Routes

// Admin login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Bookings
app.post('/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: 'Booking saved' });
});
app.get('/bookings', verifyToken, async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Customers
app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json({ message: 'Customer saved' });
});
app.get('/customers', verifyToken, async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Invoices
app.post('/invoices', verifyToken, async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.json({ message: 'Invoice created', invoice });
});
app.get('/invoices', verifyToken, async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

// Payment (PayFast demo)
app.post('/payment', (req, res) => {
  // Normally redirect to PayFast or return payment link
  res.json({ message: 'Payment integration placeholder' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
