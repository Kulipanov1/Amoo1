import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';
import { theme } from '../constants/theme';

export const ThemeToggle = () => {
  const { theme: currentTheme, setTheme } = useAppStore();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
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
      backgroundColor: theme[currentTheme].containerBg,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        {currentTheme === 'light' ? (
          <Moon size={24} color={theme[currentTheme].textColor} />
        ) : (
          <Sun size={24} color={theme[currentTheme].textColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}; 