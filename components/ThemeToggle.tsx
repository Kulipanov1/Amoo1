import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react-native';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        {theme === 'light' ? (
          <Moon size={24} color="#000" />
        ) : (
          <Sun size={24} color="#fff" />
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
    backgroundColor: 'var(--container-bg)',
  },
}); 