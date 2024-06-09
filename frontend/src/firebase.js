// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "homelink-16103.firebaseapp.com",
    projectId: "homelink-16103",
    storageBucket: "homelink-16103.appspot.com",
    messagingSenderId: "773631499983",
    appId: "1:773631499983:web:96ceb98596e30c6034e1ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);