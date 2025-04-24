import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ru',
      setTheme: (theme) => {
        set({ theme });
        if (Platform.OS === 'web') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
      storage,
    }
  )
); 