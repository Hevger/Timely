const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  email: {
    type: String,
    require: true
  },
  cvr: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = Company = mongoose.model("companies", CompanySchema);
