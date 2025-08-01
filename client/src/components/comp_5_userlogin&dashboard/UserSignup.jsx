import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberDevice: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: "user", // Ensure user role, not admin
      });

      // Redirect to user signin
      navigate("/user-signin");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Handle social login logic here
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "dark" : ""}`}>
      {/* Left Side - Marketing Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-400 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 border border-white/10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-8">
            Navigate the
            <br />
            Markets with
            <br />
            Confidence
          </h1>

          {/* Feature Pills */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 border border-white/20">
                Advanced Technical Analysis/Charting Tools
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 border border-white/20">
                Community Feeds
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 border border-white/20">
                Customizable UI for Your Trading Style
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 border border-white/20">
                Customer Support
              </span>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            </div>
            <p className="text-white/90 mb-4">
              Game changing trading software that helped me{" "}
              <span className="font-semibold text-white">
                analysis market trends
              </span>{" "}
              easily and{" "}
              <span className="font-semibold text-white">
                make better decisions
              </span>
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mr-3"></div>
              <div>
                <div className="font-semibold text-white">Aaron O'Donnell</div>
                <div className="text-cyan-400 text-sm">Pro Account</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-[480px] bg-gray-900 p-8 flex flex-col">
        {/* Header */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Dark Mode</span>
            <div
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-400 cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-3 px-4 text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-3 px-4 text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign up with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">or</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jami"
                  className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 pr-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                At least 8 characters, with numbers and symbols.
              </p>
            </div>

            {/* Remember Device */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="rememberDevice"
                checked={formData.rememberDevice}
                onChange={handleInputChange}
                className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-gray-600 rounded bg-gray-800"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember this device
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By logging in, you agree to follow our{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              terms of service
            </a>
          </p>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/user-signin" className="text-cyan-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
