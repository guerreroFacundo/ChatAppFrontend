import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';
import { AppRouter } from './components/routing/AppRouter';
import './css/app.css';


function App() {
  const { authToken, setAuthToken, currentUser, setCurrentUser, logout } = useAuth();
  const { chats, messages, selectedChat, setSelectedChat, fetchMessages } = useChat(authToken, currentUser);

  return (
    <Router>
      <div>
        <AppRouter
          authToken={authToken}
          setAuthToken={setAuthToken}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          chats={chats}
          fetchMessages={fetchMessages}
          handleLogout={logout}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
        />
      </div>
    </Router>
  );
}

export default App;
