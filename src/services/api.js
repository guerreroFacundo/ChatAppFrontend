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

    sendMessage: async (senderId, receiverId, content, replyTo, authToken) => {
        const response = await axios.post(`${BASE_URL}/api/messages/send`, null, {
            params: {
                senderId,
                receiverId,
                content,
                replyTo
            },
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    },

    deleteMessage: async (messageId, userId, authToken) => {
        const response = await axios.delete(`${BASE_URL}/api/messages/delete`, {
            params: { messageId, userId },
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    }
};
