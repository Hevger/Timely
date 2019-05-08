import {
  GET_COMPANY,
  COMPANY_LOADING,
  CLEAR_COMPANY
} from "../actions/actionTypes";

const initialState = {
  company: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false
      };
    case CLEAR_COMPANY:
      return {
        ...state,
        company: null
      };

    default:
      return state;
  }
}
