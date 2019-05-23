const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function hoursValidation(data) {
  let errors = {};

  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  // Check hours format for monday
  if (data.mondayClosed && data.mondayClosed === true) {
    data.mondayStart = "";
    data.mondayEnd = "";
  }

  if (!data.mondayClosed && data.mondayClosed === false) {
    if (!regex.test(data.mondayStart)) {
      errors.mondayStart = "Wrong hour format on monday";
    }
    if (!regex.test(data.mondayEnd)) {
      errors.mondayEnd = "Wrong hour format on monday";
    }
  }

  if (!data.mondayClosed) {
    if (data.mondayStart >= data.mondayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for tuesday
  if (data.tuesdayClosed && data.tuesdayClosed === true) {
    data.tuesdayStart = "";
    data.tuesdayEnd = "";
  }
  if (!data.tuesdayClosed && data.tuesdayClosed === false) {
    if (!regex.test(data.tuesdayStart)) {
      errors.tuesdayStart = "Wrong hour format on tuesday";
    }
    if (!regex.test(data.tuesdayEnd)) {
      errors.tuesdayEnd = "Wrong hour format on tuesday";
    }
  }

  if (!data.tuesdayClosed) {
    if (data.tuesdayStart >= data.tuesdayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for wednesday
  if (data.wednesdayClosed && data.wednesdayClosed === true) {
    data.wednesdayStart = "";
    data.wednesdayEnd = "";
  }
  if (!data.wednesdayClosed && data.wednesdayClosed === false) {
    if (!regex.test(data.wednesdayStart)) {
      errors.wednesdayStart = "Wrong hour format on wednesday";
    }
    if (!regex.test(data.wednesdayEnd)) {
      errors.wednesdayEnd = "Wrong hour format on wednesday";
    }
  }

  if (!data.wednesdayClosed) {
    if (data.wednesdayStart >= data.wednesdayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for thursday
  if (data.thursdayClosed && data.thursdayClosed === true) {
    data.thursdayStart = "";
    data.thursdayEnd = "";
  }
  if (!data.thursdayClosed && data.thursdayClosed === false) {
    if (!regex.test(data.thursdayStart)) {
      errors.thursdayStart = "Wrong hour format on thursday";
    }
    if (!regex.test(data.thursdayEnd)) {
      errors.thursdayEnd = "Wrong hour format on thursday";
    }
  }

  if (!data.thursdayClosed) {
    if (data.thursdayStart >= data.thursdayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for friday
  if (data.fridayClosed && data.fridayClosed === true) {
    data.fridayStart = "";
    data.fridayEnd = "";
  }
  if (!data.fridayClosed && data.fridayClosed === false) {
    if (!regex.test(data.fridayStart)) {
      errors.fridayStart = "Wrong hour format on friday";
    }
    if (!regex.test(data.fridayEnd)) {
      errors.fridayEnd = "Wrong hour format on friday";
    }
  }

  if (!data.fridayClosed) {
    if (data.fridayStart >= data.fridayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for saturday
  if (data.saturdayClosed && data.saturdayClosed === true) {
    data.saturdayStart = "";
    data.saturdayEnd = "";
  }
  if (!data.saturdayClosed && data.saturdayClosed === false) {
    if (!regex.test(data.saturdayStart)) {
      errors.saturdayStart = "Wrong hour format on saturday";
    }
    if (!regex.test(data.saturdayEnd)) {
      errors.saturdayEnd = "Wrong hour format on saturday";
    }
  }

  if (!data.saturdayClosed) {
    if (data.saturdayStart >= data.saturdayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  // Check hours format for sunday
  if (data.sundayClosed && data.sundayClosed === true) {
    data.sundayStart = "";
    data.sundayEnd = "";
  }
  if (!data.sundayClosed && data.sundayClosed === false) {
    if (!regex.test(data.sundayStart)) {
      errors.sundayStart = "Wrong hour format on sunday";
    }
    if (!regex.test(data.sundayEnd)) {
      errors.sundayEnd = "Wrong hour format on sunday";
    }
  }

  if (!data.sundayClosed) {
    if (data.sundayStart >= data.sundayEnd) {
      errors.invalidTime = "Close time can't be before open time";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
