import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUserStore } from "@/store/useUserStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useAppStore } from "@/store/useAppStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import TelegramWebAppProvider from "@/components/TelegramWebAppProvider";
import './styles.css';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  // Initialize stores
  const { loadMatches } = useMatchStore();
  const { getNextPotentialMatches } = useUserStore();
  const { theme } = useAppStore();

  useEffect(() => {
    // Load initial data
    loadMatches();
    getNextPotentialMatches();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <TelegramWebAppProvider>
        <SafeAreaProvider>
          <div className="app-container">
            <div className="content-container scrollable">
              <ThemeToggle />
              <LanguageSelector />
              <RootLayoutNav />
            </div>
          </div>
        </SafeAreaProvider>
      </TelegramWebAppProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'var(--background-color)',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        contentStyle: {
          backgroundColor: 'var(--container-bg)',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="chat" 
        options={{ 
          headerShown: true,
          headerTitle: "",
        }} 
      />
      <Stack.Screen 
        name="onboarding" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="telegram-auth" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}