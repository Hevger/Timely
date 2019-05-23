import axios from "axios";
import {
  GET_COMPANY,
  COMPANY_LOADING,
  CLEAR_COMPANY,
  GET_ERRORS,
  GET_EMPLOYEES,
  EMPLOYEES_LOADING,
  EMPLOYEE_LOADING,
  GET_EMPLOYEE,
  GET_SERVICES,
  SERVICES_LOADING,
  SERVICE_LOADING,
  GET_SERVICE,
  GET_HOURS,
  HOURS_LOADING,
  GET_BOOKINGS,
  BOOKINGS_LOADING,
  GET_COMPANIES,
  COMPANIES_LOADING,
  CALCULATE_SERVICES
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

// Get emplyoees
export const getEmployees = companyData => dispatch => {
  let url = "/api/company/" + companyData + "/employee";
  dispatch(setEmployeesLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_EMPLOYEES,
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

// Employees loading
export const setEmployeesLoading = () => {
  return {
    type: EMPLOYEES_LOADING
  };
};

// Get Employee
export const getEmployee = employeeId => dispatch => {
  let url = "/api/company/employee/" + employeeId;
  dispatch(setEmployeeLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE,
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

// Employee loading
export const setEmployeeLoading = () => {
  return {
    type: EMPLOYEE_LOADING
  };
};

// Add new employee
export const addNewEmployee = (employeeData, history) => dispatch => {
  let url = "/api/company/" + employeeData.id + "/employee";
  axios
    .post(url, employeeData)
    .then(res => {
      history.push("/dashboard/employees");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update employee
export const updateEmployee = (employeeData, history) => dispatch => {
  let url = "/api/company/employee/" + employeeData.id;
  axios
    .post(url, employeeData)
    .then(res => {
      history.push("/dashboard/employees");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete employee
export const deleteEmployee = (employeeData, history) => dispatch => {
  let url = "/api/company/employee/" + employeeData;
  axios
    .delete(url)
    .then(res => {
      history.push("/dashboard/employees");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get services
export const getServices = companyData => dispatch => {
  let url = "/api/company/" + companyData.id + "/service";
  dispatch(setServicesLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_SERVICES,
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

// Services loading
export const setServicesLoading = () => {
  return {
    type: SERVICES_LOADING
  };
};

// Add new service
export const addNewService = (serviceData, history) => dispatch => {
  let url = "/api/company/" + serviceData.id + "/service";
  axios
    .post(url, serviceData)
    .then(res => {
      history.push("/dashboard/services");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Service
export const getService = serviceId => dispatch => {
  let url = "/api/company/service/" + serviceId;
  dispatch(setServiceLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_SERVICE,
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

// Service loading
export const setServiceLoading = () => {
  return {
    type: SERVICE_LOADING
  };
};

// Update service
export const updateService = (serviceData, history) => dispatch => {
  let url = "/api/company/service/" + serviceData.id;
  axios
    .post(url, serviceData)
    .then(res => {
      history.push("/dashboard/services");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete service
export const deleteService = (serviceData, history) => dispatch => {
  let url = "/api/company/service/" + serviceData;
  axios
    .delete(url)
    .then(res => {
      history.push("/dashboard/services");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Opening Hours
export const getHours = companyData => dispatch => {
  let url = "/api/company/" + companyData.id + "/hours";
  dispatch(setHoursLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_HOURS,
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

// Opening hours loading
export const setHoursLoading = () => {
  return {
    type: HOURS_LOADING
  };
};

// Update Opening Hours
export const updateHours = (hoursData, history) => dispatch => {
  let url = "/api/company/" + hoursData.id + "/hours";
  axios
    .post(url, hoursData)
    .then(res => {
      history.push("/dashboard/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get bookings by employee ID
export const getBookings = employee => dispatch => {
  let url = "/api/booking/employee/" + employee;
  dispatch(setBookingsLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_BOOKINGS,
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

// Bookings loading
export const setBookingsLoading = () => {
  return {
    type: BOOKINGS_LOADING
  };
};

// Get all companies
export const getCompanies = () => dispatch => {
  let url = "/api/company/";
  dispatch(setCompaniesLoading());
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_COMPANIES,
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

// Companies loading
export const setCompaniesLoading = () => {
  return {
    type: COMPANIES_LOADING
  };
};

// Calculate Services Time
export const calculateServices = data => dispatch => {
  let url = "/api/booking/calculate";
  axios
    .post(url, data)
    .then(res =>
      dispatch({
        type: CALCULATE_SERVICES,
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

// Create booking
export const createBooking = (data, history) => dispatch => {
  let url = "/api/booking";
  axios
    .post(url, data)
    .then(res => {
      alert("Tak for din booking :)");
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
