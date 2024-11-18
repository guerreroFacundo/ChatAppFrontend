import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const api = {

    login: async (username, password) => {
        const response = await axios.post(`${BASE_URL}/api/users/login`, {
            username,
            password,
        });
        return response.data;
    },

    getChats: async (userId, authToken) => {
        console.log(BASE_URL);
        const response = await axios.get(`${BASE_URL}/api/messages/chats`, {
            params: { userId },
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    },

    getMessages: async (userId, contactId, authToken) => {
        const response = await axios.get(`${BASE_URL}/api/messages/obtenerMensajes`, {
            params: { userId, contactId },
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    },

    sendMessage: async (messageData, authToken) => {
        const response = await axios.post(`${BASE_URL}/api/messages/enviar`, messageData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    }
};
