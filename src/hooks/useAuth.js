import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [currentUser, setCurrentUser] = useState({
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  });

  const login = (token, userId, username) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    setAuthToken(token);
    setCurrentUser({ id: userId, username: username });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setAuthToken(null);
    setCurrentUser({ id: null, username: null });
  };

  return {
    authToken,
    setAuthToken,
    currentUser,
    login,
    logout,
    setCurrentUser
  };
};
