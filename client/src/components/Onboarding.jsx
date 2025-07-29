import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Onboarding = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      id: 1,
      title: "Unlock the Era of Stock",
      description:
        "Welcome to a community driven by learning and analytics. Join millions and uncover the secrets of the stock market.",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center">
          {/* Background elements */}
          <div className="absolute top-4 left-8 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute top-8 right-12 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-8 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>

          {/* Main character */}
          <div className="relative z-10">
            {/* Person illustration */}
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
              <div className="w-20 h-16 bg-blue-600 rounded-t-2xl mx-auto relative">
                {/* Arms */}
                <div className="absolute -left-3 top-2 w-6 h-3 bg-blue-600 rounded-full transform -rotate-12"></div>
                <div className="absolute -right-3 top-2 w-6 h-3 bg-blue-600 rounded-full transform rotate-12"></div>
              </div>
            </div>
          </div>

          {/* Charts and analytics elements */}
          <div className="absolute top-8 left-8">
            {/* Pie chart */}
            <div className="w-12 h-12 relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-6 h-6 bg-orange-400 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-purple-500 rounded-tr-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-8">
            {/* Bar chart */}
            <div className="flex items-end space-x-1">
              <div className="w-2 h-6 bg-blue-500 rounded-t"></div>
              <div className="w-2 h-8 bg-purple-500 rounded-t"></div>
              <div className="w-2 h-4 bg-blue-400 rounded-t"></div>
              <div className="w-2 h-10 bg-orange-400 rounded-t"></div>
            </div>
            {/* Arrow */}
            <div className="absolute -top-2 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 transform rotate-45"></div>
          </div>

          <div className="absolute bottom-4 right-4">
            {/* Growth chart */}
            <div className="w-16 h-8 relative">
              <svg className="w-full h-full" viewBox="0 0 64 32">
                <path
                  d="M0,24 Q16,20 32,12 T64,4"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500 transform rotate-45"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Powerful Analytics at your Fingertips",
      description:
        "Gain a competitive edge with our advanced analytics tools. Make informed decisions and take control of your financial future.",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center">
          {/* Background elements */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="absolute top-4 right-8 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-6 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-orange-400 rounded-full"></div>

          {/* Two people illustration */}
          <div className="flex items-center space-x-8">
            {/* First person */}
            <div className="relative">
              <div className="w-20 h-28 relative">
                {/* Head */}
                <div className="w-14 h-14 bg-yellow-200 rounded-full mx-auto mb-2 relative">
                  <div className="absolute top-0 left-2 w-10 h-6 bg-gray-800 rounded-t-full"></div>
                  <div className="absolute top-6 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-6 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                {/* Body */}
                <div className="w-18 h-14 bg-blue-600 rounded-t-2xl mx-auto"></div>
              </div>
            </div>

            {/* Second person */}
            <div className="relative">
              <div className="w-20 h-28 relative">
                {/* Head */}
                <div className="w-14 h-14 bg-yellow-200 rounded-full mx-auto mb-2 relative">
                  <div className="absolute top-0 left-2 w-10 h-6 bg-gray-800 rounded-t-full"></div>
                  <div className="absolute top-6 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-6 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                {/* Body */}
                <div className="w-18 h-14 bg-purple-600 rounded-t-2xl mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Laptop */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-10 bg-gray-800 rounded-lg relative">
              <div className="w-14 h-8 bg-blue-500 rounded-lg absolute top-1 left-1"></div>
            </div>
          </div>

          {/* Chart elements */}
          <div className="absolute top-8 left-12">
            <div className="flex items-end space-x-1">
              <div className="w-2 h-6 bg-blue-500 rounded-t"></div>
              <div className="w-2 h-8 bg-blue-600 rounded-t"></div>
              <div className="w-2 h-4 bg-blue-400 rounded-t"></div>
            </div>
            <div className="absolute -top-2 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500 transform rotate-45"></div>
          </div>

          {/* Speech bubble */}
          <div className="absolute top-6 right-4">
            <div className="w-8 h-6 bg-purple-600 rounded-lg relative">
              <div className="absolute bottom-0 left-2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-4 border-t-purple-600"></div>
              <div className="flex space-x-1 items-center justify-center h-full">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Your Path to Financial Success",
      description:
        "Where community, learning and analytics coverage. Start your journey towards financial success with us.",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center">
          {/* Background elements */}
          <div className="absolute top-4 left-8 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-8 left-6 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-8 right-12 w-3 h-3 bg-orange-400 rounded-full"></div>

          {/* Two people illustration */}
          <div className="flex items-center space-x-6">
            {/* First person */}
            <div className="relative">
              <div className="w-18 h-26 relative">
                {/* Head */}
                <div className="w-12 h-12 bg-yellow-200 rounded-full mx-auto mb-2 relative">
                  <div className="absolute top-0 left-1 w-10 h-6 bg-gray-800 rounded-t-full"></div>
                  <div className="absolute top-5 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-5 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                {/* Body */}
                <div className="w-16 h-12 bg-blue-600 rounded-t-2xl mx-auto"></div>
              </div>
            </div>

            {/* Second person */}
            <div className="relative">
              <div className="w-18 h-26 relative">
                {/* Head */}
                <div className="w-12 h-12 bg-yellow-200 rounded-full mx-auto mb-2 relative">
                  <div className="absolute top-0 left-1 w-10 h-6 bg-gray-800 rounded-t-full"></div>
                  <div className="absolute top-5 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-5 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                {/* Body */}
                <div className="w-16 h-12 bg-blue-600 rounded-t-2xl mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Communication elements */}
          <div className="absolute top-6 left-4">
            <div className="w-6 h-4 bg-purple-600 rounded-lg relative">
              <div className="flex space-x-1 items-center justify-center h-full">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <div className="w-6 h-4 bg-blue-600 rounded-lg relative">
              <div className="flex space-x-1 items-center justify-center h-full">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-8">
            <div className="w-6 h-4 bg-blue-600 rounded-lg relative">
              <div className="flex space-x-1 items-center justify-center h-full">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Email/message icons */}
          <div className="absolute top-8 left-12">
            <div className="w-4 h-3 bg-purple-600 rounded-sm relative">
              <div className="absolute top-0 left-0 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-white"></div>
            </div>
          </div>

          <div className="absolute bottom-4 left-8">
            <div className="w-4 h-3 bg-blue-600 rounded-sm relative">
              <div className="absolute top-0 left-0 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-white"></div>
            </div>
          </div>

          {/* Thumbs up icon */}
          <div className="absolute top-4 right-16">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* Heart icon */}
          <div className="absolute bottom-8 right-4">
            <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    console.log("Next clicked! Current screen:", currentScreen); // Debug log
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked!"); // Debug log
    // Store onboarding completion in localStorage
    localStorage.setItem("onboardingCompleted", "true");

    // Call the onComplete callback to update parent state
    if (onComplete) {
      console.log("Calling onComplete callback from get started"); // Debug log
      onComplete();
    } else {
      // Fallback to navigation if no callback
      console.log("No callback, navigating to / from get started"); // Debug log
      navigate("/");
    }
  };

  const handleSkip = () => {
    console.log("Skip clicked!"); // Debug log
    localStorage.setItem("onboardingCompleted", "true");

    // Call the onComplete callback to update parent state
    if (onComplete) {
      console.log("Calling onComplete callback from skip"); // Debug log
      onComplete();
    } else {
      // Fallback to navigation if no callback
      console.log("No callback, navigating to / from skip"); // Debug log
      navigate("/");
    }
  };

  const currentScreenData = screens[currentScreen];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4 md:p-6">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 active:text-gray-800 font-medium text-sm md:text-base cursor-pointer transition-colors duration-200 px-2 py-1"
        >
          skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Illustration */}
        <div className="w-full max-w-sm md:max-w-md mb-8 md:mb-12">
          {currentScreenData.illustration}
        </div>

        {/* Content */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight px-4">
            {currentScreenData.title}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm md:max-w-md px-4">
            {currentScreenData.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2 mb-6 md:mb-8">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                index === currentScreen ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <div className="w-full max-w-xs md:max-w-sm px-4">
          {currentScreen < screens.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 md:py-4 px-6 rounded-full text-base md:text-lg transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleGetStarted}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 md:py-4 px-6 rounded-full text-base md:text-lg transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
