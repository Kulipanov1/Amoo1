import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getThemeColors, ThemeMode, getColor } from '../constants/theme';

export const LanguageSelector = () => {
  const { language, setLanguage, theme: currentTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme as ThemeMode);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 32,
      right: 16,
      zIndex: 1000,
    },
    button: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: getColor(themeColors, 'containerBg'),
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: getColor(themeColors, 'textColor'),
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
        <Text style={styles.text}>{language.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}; 