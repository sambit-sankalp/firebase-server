import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDjdyueBsZ_QjSL0CcXb4XqsPk9W5_HUEM",
  authDomain: "notee-aa2df.firebaseapp.com",
  projectId: "notee-aa2df",
  storageBucket: "notee-aa2df.appspot.com",
  messagingSenderId: "1097615944494",
  appId: "1:1097615944494:web:e64a868ffaab8a7390e8bf",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
