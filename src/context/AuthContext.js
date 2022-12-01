// react imports
import { createContext, useReducer, useEffect } from "react";
import { projFirestore, projAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "AUTH_IS_READY":
            return { ...state, user: action.payload, authIsReady: true };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children  }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    });

    useEffect(() => {
        const unsub = projAuth.onAuthStateChanged((user) => {
            let uniqname = '';

            if (user) {
                uniqname = user.displayName;
            }

            dispatch({ type: 'AUTH_IS_READY', payload: user });

            return () => unsub();
        })

    }, []);

    console.log('AuthContext: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch  }}>
            { children }
        </AuthContext.Provider>
    )
}