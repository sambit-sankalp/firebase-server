import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

export const createProject =
  (project) =>
  async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });

      const firestore = getFirestore();
      const profile = getState().firebase.profile
      const id = getState().auth.uid
      await firestore.collection("projects").add({
        ...project,
        authorName: profile.name,
        authorId: id,
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
