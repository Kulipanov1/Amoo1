import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUserStore } from "@/store/useUserStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useAppStore } from "@/store/useAppStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import TelegramWebAppProvider from "@/components/TelegramWebAppProvider";
import { getThemeColors, ThemeMode, getColor } from "@/constants/theme";
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
  const { theme: currentTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme as ThemeMode);

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
    if (Platform.OS === 'web') {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  if (!loaded) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor(themeColors, 'backgroundColor'),
    },
    content: {
      flex: 1,
      backgroundColor: getColor(themeColors, 'containerBg'),
    },
  });

  if (Platform.OS === 'web') {
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

  return (
    <ErrorBoundary>
      <TelegramWebAppProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <View style={styles.content}>
              <ThemeToggle />
              <LanguageSelector />
              <RootLayoutNav />
            </View>
          </View>
        </SafeAreaProvider>
      </TelegramWebAppProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { theme: currentTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme as ThemeMode);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: getColor(themeColors, 'backgroundColor'),
        },
        headerShadowVisible: false,
        headerTintColor: getColor(themeColors, 'textColor'),
        contentStyle: {
          backgroundColor: getColor(themeColors, 'containerBg'),
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