import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getThemeColors } from '../constants/theme';

export const LanguageSelector = () => {
  const { language, setLanguage, theme: currentTheme } = useAppStore();
  const themeColors = getThemeColors(currentTheme);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: themeColors.containerBg }
        ]} 
        onPress={toggleLanguage}
      >
        <Text style={[
          styles.text,
          { color: themeColors.textColor }
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
    top: Platform.OS === 'ios' ? 60 : 32,
    right: 16,
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
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 40,
  },
}); 