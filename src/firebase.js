import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA4rrzsjdeK7l5jNm4xHyH43LspSar30DA",
  authDomain: "chat-app-u.firebaseapp.com",
  databaseURL: "https://chat-app-u.firebaseio.com",
  projectId: "chat-app-u",
  storageBucket: "chat-app-u.appspot.com",
  messagingSenderId: "522467362387",
  appId: "1:522467362387:web:87b03848a8efc59c57e8a6",
  measurementId: "G-JVT6NTV16G"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
