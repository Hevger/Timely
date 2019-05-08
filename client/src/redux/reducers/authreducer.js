import isEmpty from "../../validation/is-empty";
import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  company: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        company: action.payload
      };
    default:
      return state;
  }
}
