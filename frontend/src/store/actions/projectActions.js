import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";
import { firestore } from "../../config/firebase";

export const createProject =
  (project) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });

      console.log(getState());
      const name = getState().firebase.profile.name;
      const id = getState().firebase.auth.uid;

      await firestore.collection("projects").add({
        ...project,
        Authorname: name,
        Authorid: id,
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
