const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Employee Schema
const EmployeeSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  companyProfile: {
    type: Schema.Types.ObjectId,
    ref: "companyProfiles"
  },
  name: {
    type: String,
    require: true
  },
  photo: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
});

module.exports = Employee = mongoose.model(
  "employees",
  EmployeeSchema,
  "employees"
);
