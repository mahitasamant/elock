// firebase.config.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCaTF945neTWVeNI3Zu7V2mYtQS6DHzxw",
    authDomain: "e-lockbox.firebaseapp.com",
    projectId: "e-lockbox",
    storageBucket: "e-lockbox.firebasestorage.app",
    messagingSenderId: "558805225690",
    appId: "1:558805225690:web:ce1e53a467d771cb6c55e3",
    measurementId: "G-9HXW9MDPDM"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
