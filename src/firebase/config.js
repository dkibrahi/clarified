import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
firebase.initializeApp(firebaseConfig);

// initialize service
const projFirestore = firebase.firestore();
const projAuth = firebase.auth();

export { projFirestore, projAuth } ;

//test
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);