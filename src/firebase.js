import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcwlf4FxheGBL-9VF8Zz1aBTBnFgdL55A",
  authDomain: "happy-paws-vet.firebaseapp.com",
  projectId: "happy-paws-vet",
  storageBucket: "happy-paws-vet.firebasestorage.app",
  messagingSenderId: "163821284215",
  appId: "1:163821284215:web:4a846e3b7b3b314ec34f72"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);