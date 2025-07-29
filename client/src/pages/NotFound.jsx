import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen  bg-gray-50 flex flex-col">
      <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center text-center">
        {/* OOPS Text */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-blue-500 mb-2 tracking-wider transform -rotate-12">
            OOPS...
          </h1>
        </div>

        {/* Animation Placeholder */}
        <div className="w-full max-w-sm mx-auto mb-12">
          <div className="bg-gray-200 rounded-lg p-8 h-32 flex flex-col items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-12 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-12 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-12 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Something went wrong.
          </h2>
          <p className="text-gray-600 text-lg">
            Sorry, we can't find the page you're looking for.
          </p>
        </div>

        {/* Error Code */}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700">Error Code 404</p>
        </div>

        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        {/* Alternative Actions */}
        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:text-blue-600 font-medium underline"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => window.location.reload()}
            className="text-gray-500 hover:text-gray-600 font-medium"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
