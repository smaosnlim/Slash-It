// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLQH9nm3Mr8XfwrBfPDg0fRgl3uJl0jX4",
  authDomain: "slashit-8f9be.firebaseapp.com",
  projectId: "slashit-8f9be",
  storageBucket: "slashit-8f9be.firebasestorage.app",
  messagingSenderId: "117166682310",
  appId: "1:117166682310:web:74fad65e080f9959ee27c7",
  measurementId: "G-25RC33MSZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db };

