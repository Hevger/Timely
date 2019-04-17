const Validatior = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCompanyRegister(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.cvr = !isEmpty(data.cvr) ? data.cvr : "";

  if (!Validatior.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validatior.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validatior.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validatior.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = "Password must be between 6 and 50 characters";
  }

  if (!Validatior.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validatior.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validatior.isLength(data.cvr, { min: 8, max: 8 })) {
    errors.cvr = "CVR should be 8 numbers";
  }

  if (Validatior.isEmpty(data.cvr)) {
    errors.cvr = "CVR is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
