import api from "./api.js";

class AuthService {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { data } = response.data;

      if (data.accessToken && data.user) {
        // Store token and user data
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userData", JSON.stringify(data.user));

        return {
          success: true,
          user: data.user,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw {
        message: error.message || "Login failed",
        code: error.code || "LOGIN_ERROR",
      };
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);

      const { data } = response.data;

      if (data.accessToken && data.user) {
        // Store token and user data
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userData", JSON.stringify(data.user));

        return {
          success: true,
          user: data.user,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw {
        message: error.message || "Registration failed",
        code: error.code || "REGISTRATION_ERROR",
      };
    }
  }

  // Logout user
  async logout() {
    try {
      // Call logout endpoint if token exists
      const token = localStorage.getItem("authToken");
      if (token) {
        await api.post("/auth/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if server call fails
    } finally {
      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put("/auth/me", profileData);

      // Update local storage
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const updatedUser = { ...userData, ...response.data.data };
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return { success: true };
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      await api.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      await api.put("/auth/reset-password", {
        token,
        password: newPassword,
      });
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh", {
        refreshToken,
      });

      const { data } = response.data;

      if (data.accessToken) {
        localStorage.setItem("authToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        return data.accessToken;
      } else {
        throw new Error("Invalid refresh response");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      // Clear tokens on refresh failure
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    return !!(token && userData);
  }

  // Get stored user data
  getStoredUser() {
    try {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem("authToken");
  }

  // Verify if user has required role
  hasRole(requiredRole) {
    const user = this.getStoredUser();
    if (!user) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }

    return user.role === requiredRole;
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole("admin");
  }

  // Check if user has verified email
  isEmailVerified() {
    const user = this.getStoredUser();
    return user?.isEmailVerified || false;
  }

  // Check if user has completed KYC
  isKYCVerified() {
    const user = this.getStoredUser();
    return user?.kycStatus === "verified";
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
