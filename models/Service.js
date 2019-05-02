const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Service Schema
const ServiceSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    require: true
  },
  time: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = Service = mongoose.model(
  "services",
  ServiceSchema,
  "services"
);
