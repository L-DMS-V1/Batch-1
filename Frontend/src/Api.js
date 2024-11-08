// src/Api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
  //  console.log(response.headers)
  //  const authHeader = response.headers['Authorization'];
   if (response) {
    //  const token = authHeader.split(' ')[1]; // Extract token
    //  console.log("JWT Token:", token);
    const token = response.data;
     localStorage.setItem('token', response.data);
       // Decode the token to extract the role
       const decodedToken = jwtDecode(token);
       localStorage.setItem('role', decodedToken.role);
   } else {
     console.log("Token Generation Failed.");
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

export const getResource = async (role) => {
  const rolePathMap = {
    'ROLE_ADMIN': '/admin',
    'ROLE_MANAGER': '/manager',
    'ROLE_EMPLOYEE': '/employee',
  };
  
  try {
    const path = rolePathMap[role] || '/employee';
    const response = await axiosInstance.get(`${API_URL}${path}`);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};