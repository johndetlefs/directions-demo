import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import clientCredentials from "./credentials/client";

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export const myFirebase = firebase.auth();
