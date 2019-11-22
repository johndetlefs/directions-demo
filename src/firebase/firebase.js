import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import clientCredentials from "./client";

export const myFirebase = firebase.initializeApp(clientCredentials);
// const baseDb = myFirebase.firestore();
// export const db = baseDb;
