const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEmployeeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
