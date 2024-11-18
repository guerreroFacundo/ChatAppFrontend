import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from '../LoginComponent';
import ChatLayout from '../ChatLayout';

export const AppRouter = ({ 
  authToken, 
  setAuthToken, 
  currentUser, 
  setCurrentUser,
  chats,
  fetchMessages,
  handleLogout,
  selectedChat,
  setSelectedChat,
  messages 
}) => {
  if (!authToken) {
    return (
      <Routes>
        <Route path="/*" element={<LoginComponent setAuthToken={setAuthToken} setCurrentUser={setCurrentUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/chat-layout" element={
        <ChatLayout
          chats={chats}
          fetchMessages={fetchMessages}
          currentUser={currentUser}
          onLogout={handleLogout}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
        />
      } />
      <Route path="*" element={<Navigate to="/chat-layout" replace />} />
    </Routes>
  );
};
