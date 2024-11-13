// src/Api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL1 = 'http://localhost:8080/api/users';
const API_URL2 = 'http://localhost:8080/api/manager';
const API_URL3 = 'http://localhost:8080/api/admin';
const API_URL4 = 'http://localhost:8080/api/courses';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL1}/signup`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, { username, password });

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

// Function to retrieve the token from localStorage
export const getAuthToken = () => localStorage.getItem('token');

// Set up Axios instance with interceptor to include the token in request headers
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to get resource based on role
export const getResource = async (role) => {
  const rolePathMap = {
    'ROLE_ADMIN': '/admin',
    'ROLE_MANAGER': '/manager',
    'ROLE_EMPLOYEE': '/employee',
  };
  
  try {
    const path = rolePathMap[role] || '/employee';
    const response = await axiosInstance.get(`${API_URL1}${path}`);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRequests = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL2}/getRequests`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post(`${API_URL2}/createRequest`,requestData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Admin related API request handlers
export const getAllRequests = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL3}/getAllRequests`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequestById = async (requestId) => {
  try {
    const response = await axiosInstance.get(`${API_URL3}/getRequest/${requestId}`);
    console.log("Request Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching request:", error);
    throw error;
  }
};

// Accept Request
export const acceptRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`${API_URL3}/acceptRequest/${requestId}`);
    console.log("Accept Request Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw error;
  }
};

// Reject Request
export const rejectRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`${API_URL3}/rejectRequest/${requestId}`);
    console.log("Reject Request Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

// Course related API request handlers
export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL4}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (requestId, formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL4}/${requestId}`,formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`${API_URL4}/${courseId}`);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCourse = async (courseId, formData) => {
  try {
    const response = await axiosInstance.put(`${API_URL4}/${courseId}`, formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};




export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

