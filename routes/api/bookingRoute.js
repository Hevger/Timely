const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Controller
const bookingController = require("../../controller/bookingController");

// Booking
router.post("/", bookingController.CreateBooking);

module.exports = router;
