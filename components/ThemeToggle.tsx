import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';
import { getThemeColors, ThemeMode, getColor } from '../constants/theme';

export const ThemeToggle = () => {
  const { theme: currentTheme, setTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme as ThemeMode);

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: getColor(themeColors, 'containerBg') }
        ]} 
        onPress={toggleTheme}
      >
        {currentTheme === 'light' ? (
          <Moon size={24} color={getColor(themeColors, 'textColor')} />
        ) : (
          <Sun size={24} color={getColor(themeColors, 'textColor')} />
        )}
      </TouchableOpacity>
    </View>
  );
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 