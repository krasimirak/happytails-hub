import { createContext, useContext, useState, useEffect } from "react";

import * as authApi from '../api/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = authApi.auth.onAuthStateChanged(user => setCurrentUser(user));

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        register: authApi.register,
        login: authApi.login,
        logout: authApi.logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}