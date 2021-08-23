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

export const signin =
  (credentials) =>
  async (dispatch, { getFirebase }) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const firebase = getFirebase();

      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);

      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signout =
  () =>
  async (dispatch, { getFirebase }) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      const firebase = getFirebase();

      await firebase.auth().signOut();

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signUp =
  (newuser) =>
  async (dispatch, { getFirebase, getFirestore }) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      const firebase = getFirebase();
      const firestore = getFirestore();

      await firebase
        .auth()
        .createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then((res) => {
          return firestore.collection("users").doc(res.user.uid).set({
            name: newuser.name,
          });
        });

      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
