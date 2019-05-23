import {
  BOOKINGS_LOADING,
  GET_BOOKINGS,
  CALCULATE_SERVICES
} from "../actions/actionTypes";

const initialState = {
  bookings: [],
  currentEmployee: null,
  totalTime: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKINGS_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false
      };

    case CALCULATE_SERVICES:
      return {
        ...state,
        totalTime: action.payload
      };

    default:
      return state;
  }
}
