// frontend/src/context/AuthContext.js - UPDATED

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) { setUserInfo(JSON.parse(storedUserInfo)); }
  }, []);

  const login = async (email, password) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/users/login', { email, password }, config);
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) { throw error; }
  };

  const signup = async (name, email, password, zipCode, phone) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/users', { name, email, password, zipCode, phone }, config);
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) { throw error; }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // --- ADD THIS NEW FUNCTION ---
  // This function will be called from the profile page after a successful update
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  };

  // 7. Provide the new function to the rest of the app
  return (
    <AuthContext.Provider value={{ userInfo, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };