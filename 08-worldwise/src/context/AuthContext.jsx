/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
};

function reducer(state, action) {
    if (action.type === "login") {
        return { ...state, user: action.payload, isAuthenticated: true };
    }

    if (action.type === "logout") {
        return { ...state, user: null, isAuthenticated: false };
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz"
};

export function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        console.log("🚀 ~ email, password:", email, password);
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("Context used outside provider!");
    return context;
}
