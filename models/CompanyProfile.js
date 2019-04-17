const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create CompanyProfile Schema
const CompanyProfileSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies"
  },
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  zipcode: {
    type: Number,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  }
});

module.exports = CompanyProfile = mongoose.model(
  "companyProfiles",
  CompanyProfileSchema,
  "companyProfiles"
);
