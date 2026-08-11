import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Real InexGifts Firebase Project Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-XbBwOdskmqZRwPzHMznCh_xzH5PMIpQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "inexgifts.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "inexgifts",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "inexgifts.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "972959480445",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:972959480445:web:ad395b3fdcbad6a060cf14",
  measurementId: "G-421T4DY764"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
