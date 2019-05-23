import {
  GET_EMPLOYEES,
  EMPLOYEES_LOADING,
  GET_EMPLOYEE,
  EMPLOYEE_LOADING
} from "../actions/actionTypes";

const initialState = {
  employees: [],
  currentEmployee: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false
      };
    case EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
