const Validatior = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUpdateCompany(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (!Validatior.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validatior.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validatior.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  }

  if (!Validatior.isLength(data.phone, { min: 8, max: 8 })) {
    errors.phone = "Phone must be 8 numbers";
  }

  if (Validatior.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validatior.isEmpty(data.zipcode)) {
    errors.zipcode = "Zip code is required";
  }

  if (!Validatior.isLength(data.zipcode, { min: 4, max: 4 })) {
    errors.zipcode = "Zip code must be 4 numbers";
  }

  if (Validatior.isEmpty(data.city)) {
    errors.city = "City is required";
  }

  if (Validatior.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
