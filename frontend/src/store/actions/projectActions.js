import {
  ALL_PROJECTS_FAIL,
  ALL_PROJECTS_REQUEST,
  ALL_PROJECTS_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";
import { firestore } from "../../config/firebase";

export const createProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    console.log(getState());
    const name = getState().firebase.profile.name;
    const id = getState().firebase.auth.uid;

    await firestore.collection("projects").add({
      ...project,
      authorname: name,
      authorid: id,
    });

    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: project,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allProjects = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PROJECTS_REQUEST });

    await firestore
      .collection("projects")
      .get()
      .then((projects) => {
        dispatch({
          type: ALL_PROJECTS_SUCCESS,
          payload: projects,
        });
      });
  } catch (error) {
    dispatch({
      type: ALL_PROJECTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
