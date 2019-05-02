const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookingSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  },
  date: {
    type: Date,
    require: true
  },
  startTime: {
    type: Date,
    require: true
  },
  endTime: {
    type: Date,
    require: true
  },
  time: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  customerName: {
    type: String,
    require: true
  },
  customerPhone: {
    type: Number,
    require: true
  },
  services: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "services"
      }
    }
  ]
});

module.exports = Booking = mongoose.model("bookings", BookingSchema);
