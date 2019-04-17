const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// Body parser middelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load Routes
const companiesRoute = require("./routes/api/companiesRoute");

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log(err));

// Passport middelware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use routes
app.use("/api/company", companiesRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
