import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '@/constants/theme';

type Theme = 'light' | 'dark';
type Language = 'ru' | 'en';

interface AppState {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

// Create storage that works with both web and native
const storage = Platform.OS === 'web' 
  ? undefined 
  : createJSONStorage(() => AsyncStorage);

// Helper function to update CSS variables for web
const updateWebTheme = (theme: Theme) => {
  if (Platform.OS === 'web') {
    const themeColors = getThemeColors(theme);
    const root = document.documentElement;
    root.style.setProperty('--background-color', themeColors.backgroundColor);
    root.style.setProperty('--container-bg', themeColors.containerBg);
    root.style.setProperty('--text-color', themeColors.textColor);
    root.style.setProperty('--border-color', themeColors.borderColor);
    root.setAttribute('data-theme', theme);
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ru',
      setTheme: (theme) => {
        set({ theme });
        updateWebTheme(theme);
      },
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
      storage,
      onRehydrateStorage: () => (state) => {
        // Update web theme when state is rehydrated
        if (state) {
          updateWebTheme(state.theme);
        }
      },
    }
  )
); 