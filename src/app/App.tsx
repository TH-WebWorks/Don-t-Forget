import * as React from "react";
import { DailyOrientation } from "./components/DailyOrientation";
import { Onboarding } from "./components/Onboarding";

const ONBOARDED_KEY = "dont-forget:onboarded";

export default function App() {
  const [isOnboarded, setIsOnboarded] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDED_KEY) === "1";
    } catch {
      return false;
    }
  });

  const handleOnboardingComplete = React.useCallback(() => {
    try {
      localStorage.setItem(ONBOARDED_KEY, "1");
    } catch {
      // ignore
    }
    setIsOnboarded(true);
  }, []);

  return isOnboarded ? (
    <DailyOrientation />
  ) : (
    <Onboarding onComplete={handleOnboardingComplete} />
  );
}
