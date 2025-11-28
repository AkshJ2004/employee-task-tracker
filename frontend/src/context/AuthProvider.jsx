import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { getStoredUser, getStoredToken, storeSession, clearSession } from '../utils/authHelper';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());

  useEffect(() => {
    // If token is missing, ensure user is null
    if (!token) setUser(null);
  }, [token]);

  const login = (tokenValue, userValue) => {
    storeSession(tokenValue, userValue);
    setToken(tokenValue);
    setUser(userValue);
  };

  const logout = () => {
    clearSession();
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
