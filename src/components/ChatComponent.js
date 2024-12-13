import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { ThemeProvider, createTheme, Box, CircularProgress } from '@mui/material';
import StyledPaper from './StyledPaper';
import MessageList from './MessageList';
import InputArea from './InputArea';
import ReplyBox from './ReplyBox';
import { api } from '../services/api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
    },
  },
});

const ChatComponent = ({ currentUser, selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/messages`;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser && selectedChat) {
      const fetchData = async () => {
        setLoading(true);
        try {

          try {
            // Fetch messages using api.js
            const messagesResponse = await api.getMessages(currentUser.id, selectedChat, currentUser.authToken);
            setMessages(messagesResponse);
          } catch (error) {
            console.error('Error al obtener los datos de los mensajes:', error);
            throw new Error("Error al obtener los datos de los mensajes", error);
          }
          
          
        } catch (error) {
          throw new Error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();

      // Setup WebSocket connection
      const client = new Client({
        brokerURL: process.env.REACT_APP_WS_URL,
        onConnect: () => {
          console.log("Conexión WebSocket establecida");
          client.subscribe(`/user/${currentUser.id}/queue/messages`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        },
      });

      client.activate();
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    }
  }, [currentUser, selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await api.sendMessage(
        currentUser.id,
        selectedChat,
        newMessage,
        replyingTo ? replyingTo.id : null,
        currentUser.authToken);
      setMessages((prevMessages) => [...prevMessages, response]);
      setNewMessage('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await api.deleteMessage(messageId,currentUser.id,currentUser.authToken);
      // Actualiza el estado para eliminar el mensaje de la lista
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  };

  const handleReplyToMessage = (message) => {
    setReplyingTo(message);
    scrollToBottom();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledPaper sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flexGrow: 1, overflowY: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          <MessageList
            messages={messages}
            loading={loading}
            currentUser={currentUser}
            messagesEndRef={messagesEndRef}
            setReplyingTo={handleReplyToMessage}
            handleDeleteMessage={handleDeleteMessage}
          />
        </Box>
        <ReplyBox replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
        <InputArea
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </StyledPaper>
    </ThemeProvider>
  );
};

export default ChatComponent;
