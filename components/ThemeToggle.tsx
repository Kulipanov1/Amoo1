import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';
import { getThemeColors, ThemeMode, getColor } from '../constants/theme';

export const ThemeToggle = () => {
  const { theme: currentTheme, setTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme as ThemeMode);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (Platform.OS === 'web') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 32,
      left: 16,
      zIndex: 1000,
    },
    button: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: getColor(themeColors, 'containerBg'),
    },
  });

  const iconColor = getColor(themeColors, 'textColor');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        {currentTheme === 'light' ? (
          <Moon size={24} color={iconColor} />
        ) : (
          <Sun size={24} color={iconColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}; 