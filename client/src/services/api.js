import axios from "axios";

// Base API URL - Update this to match your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          if (window.location.pathname !== "/admin/auth") {
            window.location.href = "/admin/auth";
          }
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden:", data.message);
          break;
        case 404:
          console.error("Resource not found:", data.message);
          break;
        case 422:
          // Validation errors
          console.error("Validation error:", data.message);
          break;
        case 500:
          console.error("Server error:", data.message);
          break;
        default:
          console.error("API Error:", data.message || "Unknown error");
      }

      // Return the error response for handling in components
      return Promise.reject({
        message: data.message || "An error occurred",
        code: data.code || "UNKNOWN_ERROR",
        status,
        errors: data.errors || null,
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        message: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
        status: 0,
      });
    } else {
      // Other error
      return Promise.reject({
        message: error.message || "An unexpected error occurred",
        code: "UNKNOWN_ERROR",
        status: 0,
      });
    }
  }
);

export default api;
