import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";

// Register Company
export const registerCompany = (companyData, history) => dispatch => {
  axios
    .post("/api/company/", companyData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Company Login
export const loginCompany = companyData => dispatch => {
  axios
    .post("/api/company/login", companyData)
    .then(res => {
      // Token
      const { token } = res.data;

      // Set token to local storage
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get company data
      const decoded = jwt_decode(token);

      // Set current company
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in company
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log company out
export const logoutCompany = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current company to {} to set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
