// backend/controllers/bookingController.js
const Booking = require('../models/trainmodel');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { numberOfSeats } = req.body; // Number of seats to book
  try {
      // Get all bookings from the database
      const existingBookings = await Booking.find({}).sort({ seatNumber: 1 });

      // Determine which seats are already occupied
      const occupiedSeats = new Set(existingBookings.map(booking => booking.seatNumber));

      // Define seat rows
      const rows = [
          [1, 2, 3, 4, 5, 6, 7],
          [8, 9, 10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19, 20, 21], 
          [22, 23, 24, 25, 26, 27, 28], 
          [29, 30, 31, 32, 33, 34, 35], 
          [36, 37, 38, 39, 40, 41, 42], 
          [43, 44, 45, 46, 47, 48, 49], 
          [50, 51, 52, 53, 54, 55, 56], 
          [57, 58, 59, 60, 61, 62, 63], 
          [64, 65, 66, 67, 68, 69, 70], 
          [71, 72, 73, 74, 75, 76, 77, 78, 79, 80] 
      ];

      let availableSeats = [];
      
      // Check for available seats in each row
      for (const row of rows) {
          const availableInRow = row.filter(seat => !occupiedSeats.has(seat));
          if (availableInRow.length >= numberOfSeats) {
              // If enough seats are available in this row, select them
              availableSeats = availableInRow.slice(0, numberOfSeats);
              break;
          }
      }

      // If not enough seats were found in any row, check overall available seats
      if (availableSeats.length < numberOfSeats) {
          availableSeats = [];
          for (let i = 1; i <= 80; i++) {
              if (!occupiedSeats.has(i)) {
                  availableSeats.push(i);
              }
              if (availableSeats.length === numberOfSeats) break;
          }
      }

      // Check if we found the required number of seats
      if (availableSeats.length < numberOfSeats) {
          return res.status(400).json({ message: 'Not enough available seats. All seats are filled!' });
      }

      // Create new bookings for the available seats
      const newBookings = availableSeats.map(seatNumber => ({
          seatNumber,
          isOccupied: true
      }));

      await Booking.insertMany(newBookings);

      res.status(201).json({ message: 'Seats booked successfully', bookedSeats: availableSeats });
  } catch (error) {
      console.error('Error booking seats:', error);
      res.status(500).json({ message: 'Error booking seats', error });
  }
};



exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({}).sort({ seatNumber: 1 });
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };