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
import { auth, firestore, provider } from "../../config/firebase";

export const signin = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // await auth
    //   .signInWithEmailAndPassword(credentials.email, credentials.password)
    //   .then((userCredentials) => {
    //     dispatch({ type: LOGIN_SUCCESS });
    //   });

    await auth.signInWithPopup(provider).then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
    })

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
  async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });

      await auth.signOut().then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      });
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
  async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      await auth
        .createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then((userCredentials) => {
          dispatch({ type: SIGNUP_SUCCESS });
          const user = userCredentials.user;

          return firestore.collection("users").doc(user.uid).set(
            {
              name: newuser.name,
              email: newuser.email,
            },
            { merge: true }
          );
        });
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
