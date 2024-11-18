import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useChat = (authToken, currentUser) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (authToken && currentUser.id) {
      fetchChats(currentUser.id);
    }
  }, [authToken, currentUser.id]);

  const fetchChats = async (userId) => {
    try {
      const response = await api.getChats(userId, authToken);
      setChats(response);
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const response = await api.getMessages(currentUser.id, contactId, authToken);
      setMessages(response);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  return {
    chats,
    messages,
    selectedChat,
    setSelectedChat,
    fetchMessages
  };
};
