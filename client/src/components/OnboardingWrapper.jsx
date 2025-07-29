import React, { useState, useEffect } from "react";
import Onboarding from "./Onboarding";

const OnboardingWrapper = ({ children }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");

    console.log("Onboarding completed:", onboardingCompleted); // Debug log

    // For testing: always show onboarding first time or when not completed
    if (!onboardingCompleted || onboardingCompleted !== "true") {
      setShowOnboarding(true);
    }

    setIsLoading(false);
  }, []);

  // Function to complete onboarding and hide it
  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  // Add a function to reset onboarding (for testing)
  window.resetOnboarding = () => {
    localStorage.removeItem("onboardingCompleted");
    setShowOnboarding(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return <div>{children}</div>;
};

export default OnboardingWrapper;
