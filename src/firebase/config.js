import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwr6tt1a4rml-F7RLCQerr_fUKB73K0eY",
  authDomain: "finance-766f2.firebaseapp.com",
  projectId: "finance-766f2",
  storageBucket: "finance-766f2.appspot.com",
  messagingSenderId: "261385166508",
  appId: "1:261385166508:web:0254634c6198e04fbfc909"
};

// initialize firebase token
firebase.initializeApp(firebaseConfig);

// initialize service
const projFirestore = firebase.firestore();
const projAuth = firebase.auth();

export { projFirestore, projAuth } ;