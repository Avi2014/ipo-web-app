import React, { createContext, useReducer, useEffect } from "react";
import authService from "../services/authService.js";

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
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getStoredUser();
          const token = authService.getStoredToken();

          if (user && token) {
            // Verify token is still valid by getting current user
            try {
              const currentUser = await authService.getCurrentUser();
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: currentUser, token },
              });
            } catch (error) {
              // Token is invalid, clear it
              console.error("Token validation failed:", error);
              authService.logout();
              dispatch({ type: "SET_LOADING", payload: false });
            }
          } else {
            dispatch({ type: "SET_LOADING", payload: false });
          }
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password, userType = "user") => {
    dispatch({ type: "LOGIN_START" });

    try {
      const result = await authService.login(email, password);

      // Check if user has the required role for admin login
      if (userType === "admin" && result.user.role !== "admin") {
        throw {
          message: "Access denied. Admin privileges required.",
          code: "INSUFFICIENT_PERMISSIONS",
        };
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: result.user, token: result.token },
      });

      return { success: true, user: result.user, token: result.token };
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      throw error;
    }
  }; // Register function
  const register = async (userData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      const result = await authService.register(userData);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user: result.user, token: result.token },
      });

      return { success: true, user: result.user, token: result.token };
    } catch (error) {
      const errorMessage = error.message || "Registration failed";
      dispatch({
        type: "REGISTER_FAILURE",
        payload: errorMessage,
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  };

  // Update profile function
  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = await authService.updateProfile(updatedData);
      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Check if user has completed KYC
  const isKYCCompleted = () => {
    return authService.isKYCVerified();
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
    dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      await authService.forgotPassword(email);
      return { success: true };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      await authService.resetPassword(token, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
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
    changePassword,
    forgotPassword,
    resetPassword,

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
