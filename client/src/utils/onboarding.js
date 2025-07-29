// Utility functions for onboarding
export const resetOnboarding = () => {
  localStorage.removeItem("onboardingCompleted");
  window.location.reload();
};

export const completeOnboarding = () => {
  localStorage.setItem("onboardingCompleted", "true");
};

export const isOnboardingCompleted = () => {
  return localStorage.getItem("onboardingCompleted") === "true";
};
