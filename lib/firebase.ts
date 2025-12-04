// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// ------------------------------------------
// ✅ Client Firebase Config (from env)
// ------------------------------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Safety check
if (!firebaseConfig.apiKey) {
  throw new Error("Missing Firebase configuration in environment variables.");
}

// ------------------------------------------
// ✅ Initialize Firebase Client App
// ------------------------------------------
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// ------------------------------------------
// ✅ Export Firebase Services
// ------------------------------------------
export const auth = getAuth();
export const db = getFirestore();
export const functions = getFunctions();

export default firebaseConfig;
