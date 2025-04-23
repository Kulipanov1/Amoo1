import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export const LanguageSelector = () => {
  const { language, setLanguage } = useAppStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, language === 'ru' && styles.activeButton]}
        onPress={() => setLanguage('ru')}
      >
        <Text style={[styles.text, language === 'ru' && styles.activeText]}>RU</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === 'en' && styles.activeButton]}
        onPress={() => setLanguage('en')}
      >
        <Text style={[styles.text, language === 'en' && styles.activeText]}>EN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'var(--container-bg)',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1000,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: 'var(--border-color)',
  },
  text: {
    fontSize: 14,
    color: 'var(--text-color)',
  },
  activeText: {
    fontWeight: 'bold',
  },
}); 