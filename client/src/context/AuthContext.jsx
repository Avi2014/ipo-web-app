import React, { createContext, useReducer, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
  error: null,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Login function
  const login = async (email, password, userType = "user") => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const userData = {
        id: Date.now(),
        email,
        name: userType === "admin" ? "Admin User" : "Regular User",
        role: userType,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=3B82F6&color=fff`,
      };

      const token = "mock-jwt-token-" + Date.now();

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: userData, token },
      });

      return { success: true, user: userData, token };
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message || "Login failed",
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful registration
      const user = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        organization: userData.organization,
        role: userData.role || "user",
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=3B82F6&color=fff`,
        kycStatus: "pending",
        profileCompleted: false,
      };

      const token = "mock-jwt-token-" + Date.now();

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user, token },
      });

      return { success: true, user, token };
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.message || "Registration failed",
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    dispatch({ type: "LOGOUT" });
  };

  // Update profile function
  const updateProfile = (updatedData) => {
    const updatedUser = { ...state.user, ...updatedData };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Check if user has completed KYC
  const isKYCCompleted = () => {
    return state.user?.kycStatus === "completed";
  };

  // Check if user profile is completed
  const isProfileCompleted = () => {
    return state.user?.profileCompleted === true;
  };

  // Get user investment profile
  const getInvestmentProfile = () => {
    return state.user?.investmentProfile || null;
  };

  // Update KYC status
  const updateKYCStatus = (status) => {
    const updatedUser = { ...state.user, kycStatus: status };
    updateProfile(updatedUser);
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    token: state.token,
    error: state.error,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    clearError,

    // Utility functions
    isKYCCompleted,
    isProfileCompleted,
    getInvestmentProfile,
    updateKYCStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Default export
export default AuthProvider;
