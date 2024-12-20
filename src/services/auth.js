import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const authService = {
    login: async (username, password) => {
        const response = await axios.post(`${BASE_URL}/api/users/login`, {
            username,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json', // Ensure it's sent as JSON
            },
        });

        return response.data;
    },

    register: async ({ username, password, email }) => {
        const response = await axios.post(`${BASE_URL}/api/users/register`, {
            username,
            password,
            email,
        }, {
            headers: {
                'Content-Type': 'application/json', // Ensure it's sent as JSON
            },
        });

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
