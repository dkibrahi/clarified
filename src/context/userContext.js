import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification
     } from "@firebase/auth";

import { projAuth } from "../firebase/config"

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(projAuth, res => {
            res ? setUser(res) : setUser(null);
            setError("");
            setLoading(false);
    });
    return unsubscribe;
    }, []);

    const registerUser = (email, name, password) => {
        ///
        setLoading(true);
        createUserWithEmailAndPassword (projAuth, email, password)
        .then(() => {
                return updateProfile(projAuth.currentUser, {displayName: name})
        })
        .then((res) => console.log(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }

    const signInUser = (email, password) => {
        ///
        setLoading(true);
        signInWithEmailAndPassword(projAuth, email, password)
        .then((res) => console.log(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }

    const logoutUser = () => {
        ///\
        signOut(projAuth);
    }

    const forgotPassword = (email) => {
        ///
        return sendPasswordResetEmail(projAuth, email);
    }


    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword
    };
    return (
     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>     
    );
};
