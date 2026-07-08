// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwdEyxXZsUdzsRFgQAOJY_v7MBVelOY-4",
  authDomain: "smart-deals-12094.firebaseapp.com",
  projectId: "smart-deals-12094",
  storageBucket: "smart-deals-12094.firebasestorage.app",
  messagingSenderId: "225900843078",
  appId: "1:225900843078:web:1bb1ddf3ea0d2b35a07a47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
