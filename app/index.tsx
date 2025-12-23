import { useState } from "react";
import { Redirect } from "expo-router";
import SplashScreen from "../src/screens/SplashScreen";

export default function Index() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return <SplashScreen onFinish={() => setReady(true)} />;
  }

  return <Redirect href="/(auth)/login" />;
}
