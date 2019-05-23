import {
  GET_SERVICES,
  SERVICES_LOADING,
  GET_SERVICE,
  SERVICE_LOADING
} from "../actions/actionTypes";

const initialState = {
  services: [],
  currentService: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
        loading: false
      };
    case SERVICES_LOADING:
      return {
        ...state,
        loading: true
      };
    case SERVICE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SERVICE:
      return {
        ...state,
        currentService: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
