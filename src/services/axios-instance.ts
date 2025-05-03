// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request before sending it (e.g., add Authorization token)
    const token = localStorage.getItem("auth_token"); // Example token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response before returning it (optional)
    return response;
  },
  (error) => {
    // Handle errors globally here
    return Promise.reject(error);
  }
);

export default axiosInstance;
