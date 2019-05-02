const Validatior = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookingInput(data) {
  let errors = {};

  data.customerName = !isEmpty(data.customerName) ? data.customerName : "";
  data.customerPhone = !isEmpty(data.customerPhone) ? data.customerPhone : "";

  if (Validatior.isEmpty(data.customerPhone)) {
    errors.customerPhone = "Phone number is required";
  }

  if (Validatior.isEmpty(data.customerName)) {
    errors.customerName = "Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
