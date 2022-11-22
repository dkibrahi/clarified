import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzRTyMVnxpWCpzX1dN1-3hcio1JJKDq7I",
  authDomain: "clarafied.firebaseapp.com",
  projectId: "clarafied",
  storageBucket: "clarafied.appspot.com",
  messagingSenderId: "1066354926954",
  appId: "1:1066354926954:web:98adf90303d84937f7b113",
  measurementId: "G-B3ENLW8V6F"
};

// initialize firebase token
const app = initializeApp(firebaseConfig);

// initialize service
const projFirestore = getFirestore(app);
const projAuth = getAuth(app);

export { projFirestore, projAuth } ;