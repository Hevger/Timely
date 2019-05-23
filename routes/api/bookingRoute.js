const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Controller
const bookingController = require("../../controller/bookingController");

// Booking
router.post("/", bookingController.CreateBooking);
router.get("/employee/:id", bookingController.GetBookingsByEmployee);
router.post("/calculate/", bookingController.CalculateServices);

module.exports = router;
