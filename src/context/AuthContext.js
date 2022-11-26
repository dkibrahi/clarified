import { createContext, userReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children  }) => {
    const [state, dispatch] = userReducer(authReducer, {
        user: null,
    });
    console.log('AuthContext: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch  }}>
            { children }
        </AuthContext.Provider>
    )
}