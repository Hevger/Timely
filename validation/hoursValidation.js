const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function hoursValidation(data) {
  let errors = {};

  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  // Check hours format for monday
  if (data.mondayClosed === "true") {
    data.mondayStart = "";
    data.mondayEnd = "";
  }
  if (data.mondayClosed === "false") {
    if (!regex.test(data.mondayStart) || !regex.test(data.mondayEnd)) {
      errors.mondayStart = "Wrong hour format on monday";
    }
    if (data.mondayStart >= data.mondayEnd) {
      errors.invalidTime = "Close time can't be before open time on monday";
    }
  }

  // Check hours format for tuesday
  if (data.tuesdayClosed === "true") {
    data.tuesdayStart = "";
    data.tuesdayEnd = "";
  }
  if (data.tuesdayClosed === "false") {
    if (!regex.test(data.tuesdayStart) || !regex.test(data.tuesdayEnd)) {
      errors.tuesdayStart = "Wrong hour format on tuesday";
    }
    if (data.tuesdayStart >= data.tuesdayEnd) {
      errors.invalidTime = "Close time can't be before open time on tuesday";
    }
  }

  // Check hours format for wednesday
  if (data.wednesdayClosed === "true") {
    data.wednesdayStart = "";
    data.wednesdayEnd = "";
  }
  if (data.wednesdayClosed === "false") {
    if (!regex.test(data.wednesdayStart) || !regex.test(data.wednesdayEnd)) {
      errors.wednesdayStart = "Wrong hour format on wednesday";
    }
    if (data.wednesdayStart >= data.wednesdayEnd) {
      errors.invalidTime = "Close time can't be before open time on wednesday";
    }
  }

  // Check hours format for thursday
  if (data.thursdayClosed === "true") {
    data.thursdayStart = "";
    data.thursdayEnd = "";
  }
  if (data.thursdayClosed === "false") {
    if (!regex.test(data.thursdayStart) || !regex.test(data.thursdayEnd)) {
      errors.thursdayStart = "Wrong hour format on thursday";
    }
    if (data.thursdayStart >= data.thursdayEnd) {
      errors.invalidTime = "Close time can't be before open time on thursday";
    }
  }

  // Check hours format for friday
  if (data.fridayClosed === "true") {
    data.fridayStart = "";
    data.fridayEnd = "";
  }
  if (data.fridayClosed === "false") {
    if (!regex.test(data.fridayStart) || !regex.test(data.fridayEnd)) {
      errors.fridayStart = "Wrong hour format on friday";
    }
    if (data.fridayStart >= data.fridayEnd) {
      errors.invalidTime = "Close time can't be before open time on friday";
    }
  }

  // Check hours format for saturday
  if (data.saturdayClosed === "true") {
    data.saturdayStart = "";
    data.saturdayEnd = "";
  }
  if (data.saturdayClosed === "false") {
    if (!regex.test(data.saturdayStart) || !regex.test(data.saturdayEnd)) {
      errors.saturdayStart = "Wrong hour format on saturday";
    }
    if (data.saturdayStart >= data.saturdayEnd) {
      errors.invalidTime = "Close time can't be before open time on saturday";
    }
  }

  // Check hours format for sunday
  if (data.sundayClosed === "true") {
    data.sundayStart = "";
    data.sundayEnd = "";
  }
  if (data.sundayClosed === "false") {
    if (!regex.test(data.sundayStart) || !regex.test(data.sundayEnd)) {
      errors.sundayStart = "Wrong hour format on sunday";
    }
    if (data.sundayStart >= data.sundayEnd) {
      errors.invalidTime = "Close time can't be before open time on sunday";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
