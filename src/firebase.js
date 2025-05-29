import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA9uq5u9ytGs-o77eerh_n40we9hw7-vQ",
  authDomain: "gemini-clone-2eeab.firebaseapp.com",
  projectId: "gemini-clone-2eeab",
  storageBucket: "gemini-clone-2eeab.firebasestorage.app",
  messagingSenderId: "312524152415",
  appId: "1:312524152415:web:156fdbfdc92050432685ea",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
