import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
} from "../constants/authConstants";

export const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const signOutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SIGNUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
