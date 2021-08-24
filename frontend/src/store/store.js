import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getFirestore,
  reduxFirestore,
  firestoreReducer,
} from "redux-firestore";
import {
  getFirebase,
  reactReduxFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import firebaseConfig from "../config/firebase";

//Reducers
import { projectCreateReducer } from "./reducers/projectReducers";
import { signInReducer, signOutReducer, signUpReducer } from "./reducers/authReducers";

const reducer = combineReducers({
  signInUser: signInReducer,
  signOutUser: signOutReducer,
  signUpUser: signUpReducer,
  projectCreate: projectCreateReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const store = createStore(
  reducer,
  initialState,
  compose(
    composeWithDevTools(applyMiddleware(...middleware)),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig,{useFirestoreForProfile: true, userProfile: 'users'})
  )
);

export default store;
