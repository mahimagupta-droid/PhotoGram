// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaV4ZPSwUIa4woznGBtsOFLHyhmCSZvX8",
  authDomain: "photogram-a5660.firebaseapp.com",
  projectId: "photogram-a5660",
  storageBucket: "photogram-a5660.firebasestorage.app",
  messagingSenderId: "676268970238",
  appId: "1:676268970238:web:9ecbc086de3c1576d755af",
  measurementId: "G-890E1YK084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);