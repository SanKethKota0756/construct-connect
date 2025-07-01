// frontend/src/api.js
import axios from 'axios';

// For Create-React-App, environment variables MUST start with REACT_APP_
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const API = axios.create({
  baseURL: API_URL,
});

// This "interceptor" automatically adds the user's token to every request
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export default API;