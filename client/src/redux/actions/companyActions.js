import axios from "axios";
import {
  GET_COMPANY,
  COMPANY_LOADING,
  CLEAR_COMPANY,
  GET_ERRORS
} from "./actionTypes";

// GET current company
export const getCompany = () => dispatch => {
  dispatch(setCompanyLoading());
  axios
    .get("/api/company/current")
    .then(res =>
      dispatch({
        type: GET_COMPANY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Company loading
export const setCompanyLoading = () => {
  return {
    type: COMPANY_LOADING
  };
};

// Clear company
export const clearCurrentCompany = () => {
  return {
    type: CLEAR_COMPANY
  };
};

// Update company profile
export const updateCompanyProfile = (companyData, history) => dispatch => {
  let url = "/api/company/" + companyData.id;
  axios
    .post(url, companyData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
