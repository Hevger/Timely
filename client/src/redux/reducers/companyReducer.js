import { GET_COMPANIES, COMPANIES_LOADING } from "../actions/actionTypes";

const initialState = {
  companies: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
