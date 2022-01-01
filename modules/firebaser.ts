import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  Timestamp,
  query,
  where,
  limit,
  startAfter,
  onSnapshot,
  getDoc,
  collectionGroup,
  orderBy,
  writeBatch,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE0a1-Cfp9_z-iWPpEJbxaY5lQGmW36AY",
  authDomain: "idekita-98690.firebaseapp.com",
  projectId: "idekita-98690",
  storageBucket: "idekita-98690.appspot.com",
  messagingSenderId: "614015177226",
  appId: "1:614015177226:web:7146d4fd9f3f879239c5f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const fromMilis = Timestamp.fromMillis;

export {
  app,
  db,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  collection,
  limit,
  doc,
  startAfter,
  getDoc,
  collectionGroup,
  orderBy,
  query,
  getDocs,
  where,
  onSnapshot,
  fromMilis,
  serverTimestamp,
  writeBatch,
};
