import React, { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const ForgotPassword = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      setIsEmailSent(true);
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Show success message or update UI
    } catch {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600">We've sent a password reset link to</p>
            <p className="text-blue-600 font-medium">{email}</p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">What's next?</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Check your email inbox</li>
              <li>• Click the reset link in the email</li>
              <li>• Create a new password</li>
              <li>• Sign in with your new password</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full bg-blue-100 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Sending..." : "Resend Email"}
            </button>

            <button
              onClick={onBackToSignIn}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Sign In
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={handleResendEmail}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="mt-6">
          <button
            onClick={onBackToSignIn}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Sign In
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <button
              onClick={onBackToSignIn}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
