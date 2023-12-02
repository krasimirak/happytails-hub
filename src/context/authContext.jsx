import { createContext, useContext, useState, useEffect } from "react";

import * as authApi from '../api/auth';

import { USER_ROLES } from "../constants";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = authApi.auth.onAuthStateChanged(user => {
            if (user) {
                authApi.getAdditionalCurrentUserData()
                    .then(data => setCurrentUser({...user, ...data}))
                    .catch(error => {
                        setCurrentUser(user);
                        console.log(error);
                    });
            }
            else {
                setCurrentUser(null);
            }
    });

        return unsubscribe;
    }, [])

    const value = {
        isLoggedIn: !!currentUser?.uid,
        isAdmin: currentUser?.role === USER_ROLES.admin,
        user: {
            id: currentUser?.uid,
            email: currentUser?.email,
            name: currentUser?.displayName
        },
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