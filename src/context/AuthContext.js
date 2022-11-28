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
            return { ...state, user: action.payload, isAdmin: action.isAdmin, authIsReady: true };
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

            let isAdmin = false;

            if (user) {
                uniqname = user.email.substring(0, user.email.indexOf('@'));
            }

            try {
                projFirestore.collection('users').doc(uniqname).get().then(data => {
                if (data.exists) {
                    const res = data.data();
                    isAdmin = res.isAdmin;

                    dispatch({ type: 'AUTH_IS_READY', isAdmin: isAdmin, payload: user });

                    unsub();
                }
            });

            } catch (err) {
                console.log(err);

                dispatch({ type: 'AUTH_IS_READY', isAdmin: isAdmin, payload: user });

                unsub();
            }

        })

    }, []);

    console.log('AuthContext: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch  }}>
            { children }
        </AuthContext.Provider>
    )
}