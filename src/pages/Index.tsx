import { useState, useEffect } from "react";
import AuthScreen from "@/components/vainakh/AuthScreen";
import PrivacyScreen from "@/components/vainakh/PrivacyScreen";
import ProfileSetupScreen from "@/components/vainakh/ProfileSetupScreen";
import MainApp from "@/components/vainakh/MainApp";

type AppStep = "auth" | "otp" | "privacy" | "setup" | "app";

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const Index = () => {
  useEffect(() => {
    const saved = localStorage.getItem("vn-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const [step, setStep] = useState<AppStep>("auth");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleEmailSubmit = (email: string) => {
    setUserData((p) => ({ ...p, email }));
    setStep("otp");
  };

  const handleOtpVerified = () => {
    setStep("privacy");
  };

  const handlePrivacyAccepted = () => {
    setStep("setup");
  };

  const handleSetupComplete = (data: { firstName: string; lastName: string; phone: string }) => {
    setUserData((p) => ({ ...p, ...data }));
    setStep("app");
  };

  if (step === "app") {
    return <MainApp userData={userData} />;
  }

  if (step === "privacy") {
    return <PrivacyScreen onAccept={handlePrivacyAccepted} />;
  }

  if (step === "setup") {
    return <ProfileSetupScreen onComplete={handleSetupComplete} />;
  }

  return (
    <AuthScreen
      step={step}
      email={userData.email}
      onEmailSubmit={handleEmailSubmit}
      onOtpVerified={handleOtpVerified}
    />
  );
};

export default Index;