import { Platform } from 'react-native';

interface ThemeColors {
  backgroundColor: string;
  containerBg: string;
  textColor: string;
  borderColor: string;
}

const lightTheme: ThemeColors = {
  backgroundColor: '#f5f5f5',
  containerBg: '#ffffff',
  textColor: '#000000',
  borderColor: '#e0e0e0',
};

const darkTheme: ThemeColors = {
  backgroundColor: '#1a1a1a',
  containerBg: '#2d2d2d',
  textColor: '#ffffff',
  borderColor: '#404040',
};

export type ThemeMode = 'light' | 'dark';

export const getThemeColors = (mode: ThemeMode): ThemeColors => {
  return mode === 'light' ? lightTheme : darkTheme;
};

export const getColor = (theme: ThemeColors, key: keyof ThemeColors): string => {
  return theme[key];
};

// For web CSS variables
if (Platform.OS === 'web') {
  const root = document.documentElement;
  const setCSSVariables = (theme: ThemeColors) => {
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--container-bg', theme.containerBg);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--border-color', theme.borderColor);
  };

  // Set initial theme
  setCSSVariables(lightTheme);
} 