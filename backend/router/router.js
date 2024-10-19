// backend/routes/bookingRoutes.js
const express = require('express');
const {
  createBooking,
  getAllBookings,
} = require('../controller/seatbooking');

const router = express.Router();

// Define routes
router.post('/', createBooking); // Create a new booking
router.get('/', getAllBookings); // Get all bookings

module.exports = router;
