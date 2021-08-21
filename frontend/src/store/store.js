import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getFirestore, reduxFirestore, firestoreReducer } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import firebase from "../config/firebase";

//Reducers
import { projectCreateReducer } from "./reducers/projectReducers"

const reducer = combineReducers({
  projectCreate: projectCreateReducer,
  firestore: firestoreReducer
});

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const store = createStore(
  reducer,
  initialState,
  compose(
    composeWithDevTools(applyMiddleware(...middleware)),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase)
  )
);

export default store;
