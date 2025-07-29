import React from "react";
import { useNavigate } from "react-router-dom";

const OnboardingTest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Onboarding Test Page
        </h1>
        <p className="text-gray-600 mb-8">
          This is a simple test to verify the onboarding component works.
        </p>
      </div>

      {/* Test Illustration */}
      <div className="w-full max-w-sm mb-8">
        <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
          {/* Simple test illustration */}
          <div className="relative z-10">
            <div className="w-24 h-32 relative">
              {/* Head */}
              <div className="w-16 h-16 bg-yellow-200 rounded-full mx-auto mb-2 relative">
                {/* Hair */}
                <div className="absolute top-0 left-2 w-12 h-8 bg-gray-800 rounded-t-full"></div>
                {/* Face features */}
                <div className="absolute top-8 left-5 w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute top-8 right-5 w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
              {/* Body */}
              <div className="w-20 h-16 bg-blue-600 rounded-t-2xl mx-auto"></div>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute top-4 left-8 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute top-8 right-12 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-8 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
        </div>
      </div>

      {/* Test Content */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unlock the Era of Stock
        </h2>
        <p className="text-gray-600 text-base max-w-sm">
          Welcome to a community driven by learning and analytics. Join millions
          and uncover the secrets of the stock market.
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex space-x-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      </div>

      {/* Test Buttons */}
      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => {
            localStorage.removeItem("onboardingCompleted");
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-full text-lg transition-colors duration-200"
        >
          🚀 Test Onboarding Flow
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-base transition-colors duration-200"
        >
          🏠 Go to Dashboard
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("onboardingCompleted");
            alert("Onboarding reset! Visit dashboard to see onboarding.");
          }}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full text-sm transition-colors duration-200"
        >
          🔄 Reset Onboarding Only
        </button>
      </div>

      {/* Status Display */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Current Status:</h3>
        <p className="text-sm">
          Onboarding Completed:{" "}
          {localStorage.getItem("onboardingCompleted") || "false"}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Check browser console for debug logs (F12)
        </p>
      </div>
    </div>
  );
};

export default OnboardingTest;
