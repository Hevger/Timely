const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateServiceInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.time = !isEmpty(data.time) ? data.time : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.time)) {
    errors.time = "Time field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
