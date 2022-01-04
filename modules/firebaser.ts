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
  updateDoc,
  startAfter,
  onSnapshot,
  getDoc,
  setDoc,
  deleteDoc,
  increment,
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

// Back up development
const firebaseConfig2 = {
  apiKey: "AIzaSyD7Y4BDTjvEH5TRBzFMp12owMv2eCV07Is",
  authDomain: "idekita2-d3011.firebaseapp.com",
  projectId: "idekita2-d3011",
  storageBucket: "idekita2-d3011.appspot.com",
  messagingSenderId: "85598449281",
  appId: "1:85598449281:web:5eb8d5201f1eebf397e780",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig2);
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
  setDoc,
  deleteDoc,
  collectionGroup,
  orderBy,
  updateDoc,
  increment,
  query,
  getDocs,
  where,
  onSnapshot,
  fromMilis,
  serverTimestamp,
  writeBatch,
};
