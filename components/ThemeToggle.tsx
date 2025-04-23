import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <TouchableOpacity className="theme-toggle" onPress={toggleTheme}>
      {theme === 'light' ? (
        <Moon size={24} color="#000" />
      ) : (
        <Sun size={24} color="#fff" />
      )}
    </TouchableOpacity>
  );
}; 