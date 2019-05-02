const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Employee Schema
const EmployeeSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  }
});

module.exports = Employee = mongoose.model(
  "employees",
  EmployeeSchema,
  "employees"
);
