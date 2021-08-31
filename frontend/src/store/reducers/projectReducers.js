import {
  ALL_PROJECTS_FAIL,
  ALL_PROJECTS_REQUEST,
  ALL_PROJECTS_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_RESET,
  CREATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

export const projectCreateReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        loading: false,
        success: true,
        article: action.payload,
      };
    case CREATE_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_PROJECT_RESET:
      return {
        article: {},
      };
    default:
      return state;
  }
};

export const allProjectsReducer = (state = { article: [] }, action) => {
  switch (action.type) {
    case ALL_PROJECTS_REQUEST:
      return {
        loading: true,
      };
    case ALL_PROJECTS_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case ALL_PROJECTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};