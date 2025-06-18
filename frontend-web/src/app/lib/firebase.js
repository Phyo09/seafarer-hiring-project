// lib/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy3IC96nef3h1EOsfeqXsLERQJVRgRvMw",
  authDomain: "seafarerhiringplatform.firebaseapp.com",
  projectId: "seafarerhiringplatform",
  storageBucket: "seafarerhiringplatform.firebasestorage.app",
  messagingSenderId: "120298227725",
  appId: "1:120298227725:web:02c17a3f217111d44e6d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };