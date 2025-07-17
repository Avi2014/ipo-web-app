import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const AuthContainer = () => {
  const [currentView, setCurrentView] = useState("signin"); // 'signin', 'signup', 'forgot'

  const handleToggleMode = () => {
    setCurrentView(currentView === "signin" ? "signup" : "signin");
  };

  const handleForgotPassword = () => {
    setCurrentView("forgot");
  };

  const handleBackToSignIn = () => {
    setCurrentView("signin");
  };

  switch (currentView) {
    case "signup":
      return <SignUp onToggleMode={handleToggleMode} />;
    case "forgot":
      return <ForgotPassword onBackToSignIn={handleBackToSignIn} />;
    case "signin":
    default:
      return (
        <SignIn
          onToggleMode={handleToggleMode}
          onForgotPassword={handleForgotPassword}
        />
      );
  }
};

export default AuthContainer;
