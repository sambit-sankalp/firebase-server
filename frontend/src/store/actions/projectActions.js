import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

export const createProject =
  (project) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });

      const firestore = getFirestore();
      await firestore.collection("projects").add({
        ...project,
        authorId: 12345,
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
