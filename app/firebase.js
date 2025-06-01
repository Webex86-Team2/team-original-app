import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCgN70dKVKKwlQGlFTXf5SnF2dXsuQ7adk",
  authDomain: "team-original-app-webex86.firebaseapp.com",
  projectId: "team-original-app-webex86",
  storageBucket: "team-original-app-webex86.appspot.com",
  messagingSenderId: "170941752287",
  appId: "1:170941752287:web:411bf67c1190a0a4959a6a",
  measurementId: "G-HS6S0GT337",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

