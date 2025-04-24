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
  const updateWebTheme = (theme: ThemeMode) => {
    const themeColors = getThemeColors(theme);
    const root = document.documentElement;
    root.style.setProperty('--background-color', themeColors.backgroundColor);
    root.style.setProperty('--container-bg', themeColors.containerBg);
    root.style.setProperty('--text-color', themeColors.textColor);
    root.style.setProperty('--border-color', themeColors.borderColor);
    root.setAttribute('data-theme', theme);
  };

  // Set initial theme based on system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme: ThemeMode = prefersDark ? 'dark' : 'light';
  updateWebTheme(initialTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme: ThemeMode = e.matches ? 'dark' : 'light';
    updateWebTheme(newTheme);
  });
}

export const theme = {
  light: {
    '--background-color': '#f5f5f5',
    '--container-bg': '#ffffff',
    '--text-color': '#000000',
    '--border-color': '#e0e0e0',
  },
  dark: {
    '--background-color': '#1a1a1a',
    '--container-bg': '#2d2d2d',
    '--text-color': '#ffffff',
    '--border-color': '#404040',
  },
} as const; 