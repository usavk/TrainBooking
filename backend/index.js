// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Booking = require('./models/trainmodel');

const bookingRoutes = require('./router/router'); // Correct file path

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use booking routes
app.use('/api/bookings', bookingRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Train Booking Backend!');
});

app.delete('/api/bookings', async (req, res) => {
  try {
    const result = await Booking.deleteMany({}); // This deletes all documents in the Booking collection
    res.status(200).json({ message: 'All bookings deleted', result });
  } catch (error) {
    console.error('Error deleting bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
