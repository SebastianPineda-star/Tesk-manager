import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJuC0TRO5q-RRYW4nRKouKYzK-_TJh5BU",
  authDomain: "taskmanagerapp-a52dc.firebaseapp.com",
  projectId: "taskmanagerapp-a52dc",
  storageBucket: "taskmanagerapp-a52dc.firebasestorage.app",
  messagingSenderId: "723624971593",
  appId: "1:723624971593:web:757cb3c40a60b3bbd79e98"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);