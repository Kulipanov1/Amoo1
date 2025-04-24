import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';
import { getThemeColors } from '../constants/theme';

export const ThemeToggle = () => {
  const { theme: currentTheme, setTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme);

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: themeColors.containerBg }
        ]} 
        onPress={toggleTheme}
      >
        {currentTheme === 'light' ? (
          <Moon size={24} color={themeColors.textColor} />
        ) : (
          <Sun size={24} color={themeColors.textColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 32,
    left: 16,
    zIndex: 1000,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      default: {
        // Web
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      },
    }),
  },
}); 