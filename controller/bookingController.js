const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Company = require("../models/Company");
const CompanyProfile = require("../models/CompanyProfile");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const Hours = require("../models/Hours");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

// Load Validators
const validateBookingInput = require("../validation/validateBookingInput");

// Convert string to date
const toDate = function(dateString) {
  const [dd, mm, yyyy] = dateString.split("-");
  return new Date(`${yyyy}-${mm}-${dd}`);
};

// Add Service
exports.CreateBooking = async (req, res) => {
  const { errors, isValid } = validateBookingInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Set start time
  const startTime = req.body.startTime;
  let hours = startTime.substring(0, 2);
  let minutes = startTime.substring(3, 5);
  let endTime = toDate(req.body.date);
  let newStartTime = toDate(req.body.date);
  endTime.setUTCHours(hours);
  newStartTime.setUTCHours(hours);
  newStartTime.setUTCMinutes(minutes);

  // Create booking object
  const newBooking = new Booking({
    employee: req.body.employee,
    customerName: req.body.customerName,
    customerPhone: req.body.customerPhone,
    startTime: newStartTime,
    date: toDate(req.body.date),
    price: 0,
    time: 0,
    company: ""
  });

  // Get services and add them to an array
  // Add them to newBooking obejct
  const myServices = [];
  const servicesArray = req.body.services.toString().split(",");

  for (let i = 0; i < servicesArray.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(servicesArray[i])) {
      return res.status(400).json({ error: "Invalid object id" });
    }

    // Service.findById(servicesArray[i]).then(service => {
    //   if (!service) {
    //     return res.status(404).json({ error: "Service not found" });
    //   }
    //   newBooking.time += service.time;
    // });

    const service = await Service.findById(servicesArray[i]);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    } else {
      newBooking.price += service.price;
      newBooking.time += service.time;
    }

    const item = {
      service: servicesArray[i]
    };
    myServices.push(item);
  }

  newBooking.services = myServices;

  // Set end time (end time is calculated by start time + time of all services)
  let getStartTimeMinuts = newStartTime.getUTCMinutes().toString();
  let total = parseInt(getStartTimeMinuts) + parseInt(newBooking.time);

  newBooking.endTime = endTime.setUTCMinutes(total);

  // Convert date to days name and check if date is outside opening hours
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  let dayName = days[newBooking.date.getDay()];

  Employee.findById(req.body.employee).then(employee => {
    // Check if booking is in past

    companyId = employee.company;
    Hours.findOne({ company: companyId }).then(hours => {
      let now = new Date();
      now = moment(now).format("MM/DD/YYYY");
      bookingDate = moment(toDate(req.body.date)).format("MM/DD/YYYY");
      if (bookingDate < now) {
        return res.json({
          error: "you can't book in past"
        });
      }

      if (hours.hours[0][dayName.toString()].closed) {
        return res.json({
          error: "is closed on selected date"
        });
      }

      if (startTime < hours.hours[0][dayName.toString()].start) {
        return res.json({
          error: "requsted time is before opening hours"
        });
      }

      let endingTime =
        newBooking.endTime.getUTCHours() +
        ":" +
        newBooking.endTime
          .getUTCMinutes()
          .toString()
          .replace(/^(\d)$/, "0$1");

      if (endingTime > hours.hours[0][dayName.toString()].end) {
        return res.json({
          error: "requsted time is after close time"
        });
      }
    });
  });

  // save
  saveBooking = () => {
    Employee.findById(req.body.employee)
      .then(employee => {
        newBooking.company = employee.company;
        newBooking.save().then(booking => res.json(booking));
      })
      .catch(err => console.log(err));
  };

  // Check if booking is overlapping
  Booking.find({
    employee: req.body.employee,
    date: toDate(req.body.date)
  }).then(bookings => {
    bookings.forEach(booking => {
      var range1 = moment.range(booking.startTime, booking.endTime);
      var range2 = moment.range(newBooking.startTime, newBooking.endTime);
      if (range1.overlaps(range2)) {
        errors.overlapped = "this booking is overlapping another booking";
      }
    });
    // Find company by employee and add to booking
    if (errors.overlapped == undefined) {
      saveBooking();
    } else {
      return res.json({
        error: "this booking is overlapping another booking"
      });
    }
  });
};

// GET Bookings by employee ID
exports.GetBookingsByEmployee = (req, res) => {
  const errors = {};
  Booking.find({ employee: req.params.id })
    .then(bookings => {
      if (!bookings) {
        errors.bookings = "No bookings found";
        return res.status(404).json(errors);
      }
      res.json(bookings);
    })
    .catch(err => console.log(err));
};

// Calculate services time in total
exports.CalculateServices = async (req, res) => {
  const errors = {};
  let total = 0;
  if (req.body.selectedServices == null) {
    return res.status(404).json({ error: "Services is required" });
  }
  const servicesString = req.body.selectedServices.join(",");
  const servicesArray = servicesString.toString().split(",");
  for (let i = 0; i < servicesArray.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(servicesArray[i])) {
      return res.status(400).json({ error: "Invalid object id" });
    }

    const service = await Service.findById(servicesArray[i]);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    } else {
      total += service.time;
    }
  }
  res.json({ totalTime: total });
};
