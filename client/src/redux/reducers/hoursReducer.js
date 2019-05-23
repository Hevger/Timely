import { GET_HOURS, HOURS_LOADING } from "../actions/actionTypes";

const initialState = {
  hours: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HOURS:
      return {
        ...state,
        hours: action.payload,
        loading: false
      };
    case HOURS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
