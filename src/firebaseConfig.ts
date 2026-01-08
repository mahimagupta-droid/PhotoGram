import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaV4ZPSwUIa4woznGBtsOFLHyhmCSZvX8",
  authDomain: "photogram-a5660.firebaseapp.com",
  projectId: "photogram-a5660",
  storageBucket: "photogram-a5660.firebasestorage.app",
  messagingSenderId: "676268970238",
  appId: "1:676268970238:web:9ecbc086de3c1576d755af",
  measurementId: "G-890E1YK084"
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);