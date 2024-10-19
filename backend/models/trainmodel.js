// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true,
        unique: true,
      },
      isOccupied: {
        type: Boolean,
        default: false,
      },
});

module.exports = mongoose.model('Booking', bookingSchema);
