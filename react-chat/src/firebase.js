import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9DWKIjEa1gwYgFggRWYoJjFkVd55x87I",
  authDomain: "chat-d7055.firebaseapp.com",
  projectId: "chat-d7055",
  storageBucket: "chat-d7055.appspot.com",
  messagingSenderId: "795047088807",
  appId: "1:795047088807:web:b362b6121bd98cb78d8182"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();