import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPH1eBS7XzI9pGwbOHh-QfFfgbHT5x1ck",
  authDomain: "d-muscle-group-visualiza-cbe10.firebaseapp.com",
  projectId: "d-muscle-group-visualiza-cbe10",
  storageBucket: "d-muscle-group-visualiza-cbe10.appspot.com",
  messagingSenderId: "786060778469",
  appId: "1:786060778469:web:55211c3d6e0a95e2b72d0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

export { app, auth };
