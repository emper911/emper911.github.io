import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "midi-neutron",
  appId: "1:148722849364:web:0c52b59925189450d9ffc1",
  storageBucket: "midi-neutron.firebasestorage.app",
  apiKey: "AIzaSyABTZmUQPIZE8BAJpov9hb0PxaFfCVa33s",
  authDomain: "midi-neutron.firebaseapp.com",
  messagingSenderId: "148722849364",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
