import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useChat } from './hooks/useChat';
import { AppRouter } from './components/routing/AppRouter';
import { AuthProvider, useAuth } from './context/AuthContext';
import './css/app.css';

function AppContent() {
  const { authToken, currentUser, logout } = useAuth();
  const { chats, messages, selectedChat, setSelectedChat, fetchMessages } = useChat(authToken, currentUser);

  return (
    <div>
      <AppRouter
        authToken={authToken}
        currentUser={currentUser}
        chats={chats}
        fetchMessages={fetchMessages}
        handleLogout={logout}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
