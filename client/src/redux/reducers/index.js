import { combineReducers } from "redux";
import authReducer from "./authreducer";
import errorReducer from "./errorReducer";
import companyProfileReducer from "./companyProfileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  company: companyProfileReducer
});

export default rootReducer;
