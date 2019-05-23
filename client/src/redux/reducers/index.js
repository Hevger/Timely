import { combineReducers } from "redux";
import authReducer from "./authreducer";
import errorReducer from "./errorReducer";
import companyProfileReducer from "./companyProfileReducer";
import employeeReducer from "./employeeReducer";
import servicesReducer from "./servicesReducer";
import hoursReducer from "./hoursReducer";
import bookingReducer from "./bookingReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  company: companyProfileReducer,
  employees: employeeReducer,
  services: servicesReducer,
  hours: hoursReducer,
  bookings: bookingReducer,
  companies: companyReducer
});

export default rootReducer;
