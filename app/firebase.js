import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCgN70dKVKKwlQGlFTXf5SnF2dXsuQ7adk",
  authDomain: "team-original-app-webex86.firebaseapp.com",
  projectId: "team-original-app-webex86",
  storageBucket: "team-original-app-webex86.firebasestorage.app",
  messagingSenderId: "170941752287",
  appId: "1:170941752287:web:411bf67c1190a0a4959a6a",
  measurementId: "G-HS6S0GT337",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
