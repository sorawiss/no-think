import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "./lib/database";

export default function RootLayout() {

  useEffect(() => {
    const setupDB = async () => {
      await initDB();
      console.log('Database initialized');
    };
    setupDB();
  }, []);


  return (
    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
