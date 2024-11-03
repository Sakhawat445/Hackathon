// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1uDygT_Vs4aoZBaLW8x-TnQQ3VLbhCbM",
  authDomain: "hackathon-83432.firebaseapp.com",
  projectId: "hackathon-83432",
  storageBucket: "hackathon-83432.firebasestorage.app",
  messagingSenderId: "569013888729",
  appId: "1:569013888729:web:5ea1610ca663003c3940c8",
  measurementId: "G-4S5DPE0ZM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
export {auth}