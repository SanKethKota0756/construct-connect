// frontend/src/context/AuthContext.js - FULLY UPDATED

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // 1. CHANGED: Import our new central API instance instead of axios

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
      // 2. CHANGED: Use API.post and remove the config object and full URL
      const { data } = await API.post('/api/users/login', { email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) { throw error; }
  };

  const signup = async (name, email, password, zipCode, phone) => {
    try {
      // 3. CHANGED: Use API.post and remove the config object and full URL
      const { data } = await API.post('/api/users', { name, email, password, zipCode, phone });
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

  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };