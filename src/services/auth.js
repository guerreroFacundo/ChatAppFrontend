import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const authService = {
    login: async (credentials) => {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    },

    setAuthData: (token, userId, username) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
    }
};
