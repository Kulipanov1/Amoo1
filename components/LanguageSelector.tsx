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

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: getColor(themeColors, 'containerBg') }
        ]} 
        onPress={toggleLanguage}
      >
        <Text style={[
          styles.text,
          { color: getColor(themeColors, 'textColor') }
        ]}>
          {language.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 40,
  },
}); 