import { createContext, useEffect } from "react";
import {
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification
     } from "firebase/auth"
import  { auth } from "../firebase";

// use code from userContext 

