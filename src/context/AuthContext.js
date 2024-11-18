import React, { createContext, useState, useContext } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [currentUser, setCurrentUser] = useState({
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
    });

    const login = async (token, userId, username) => {
        return new Promise((resolve) => {
            authService.setAuthData(token, userId, username);
            setAuthToken(token);
            setCurrentUser({ id: userId, username: username });
            resolve();
        });
    };

    const logout = () => {
        authService.logout();
        setAuthToken(null);
        setCurrentUser({ id: null, username: null });
    };

    return (
        <AuthContext.Provider value={{ authToken, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
