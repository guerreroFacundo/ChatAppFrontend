import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [currentUser, setCurrentUser] = useState({
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
    });

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        authService.setAuthData(data.token, data.userId, data.username);
        setAuthToken(data.token);
        setCurrentUser({ id: data.userId, username: data.username });
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
