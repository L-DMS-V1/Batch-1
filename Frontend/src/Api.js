// src/Api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

   // Check for Authorization header specifically
   const authHeader = response.headers['Authorization'];
   if (authHeader) {
     const token = authHeader.split(' ')[1]; // Extract token
     console.log("JWT Token:", token);
     localStorage.setItem('token', token);
   } else {
     console.log("Authorization header not found in the response.");
   }
    return response;
  } catch (error) {
    throw error;
  }
};

// Add a function to get the stored token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add an interceptor to include the token in headers of future requests
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const getResource = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};