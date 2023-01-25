// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNjUnyyapk0w_quFiOhNsOp_AZwe5s_Ak",
  authDomain: "todo-development-7dbf0.firebaseapp.com",
  projectId: "todo-development-7dbf0",
  storageBucket: "todo-development-7dbf0.appspot.com",
  messagingSenderId: "549026075491",
  appId: "1:549026075491:web:2017c2106843e1eaf9f956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)