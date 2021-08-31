import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getFirestore,
  reduxFirestore,
  firestoreReducer,
  createFirestoreInstance,
} from "redux-firestore";
import {
  getFirebase,
  useFirebase,
  reactReduxFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import firebaseConfig from "../config/firebase";

//Reducers
import { allProjectsReducer, projectCreateReducer } from "./reducers/projectReducers";
import {
  signInReducer,
  signOutReducer,
  signUpReducer,
} from "./reducers/authReducers";

const reducer = combineReducers({
  signInUser: signInReducer,
  signOutUser: signOutReducer,
  signUpUser: signUpReducer,
  projectCreate: projectCreateReducer,
  projectList: allProjectsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const initialState = {};

const middlewares = [thunk.withExtraArgument({useFirebase, getFirestore})];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const rrfProps = {
  firebase: firebaseConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

