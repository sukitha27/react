// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOtTRjDQYIdL2Mvg2-k03lMdabsZZko2Q",
  authDomain: "test-7e103.firebaseapp.com",
  projectId: "test-7e103",
  storageBucket: "test-7e103.appspot.com",
  messagingSenderId: "148961184831",
  appId: "1:148961184831:web:65dbd03e44454433897c8a",
  measurementId: "G-3L85FQNXKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app); // Ensure 'auth' is being exported
export const db = getFirestore(app); // Initialize Firestore and export it