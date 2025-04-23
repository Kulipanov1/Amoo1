import { Platform } from 'react-native';

type BaseColors = {
  backgroundColor: string;
  containerBg: string;
  textColor: string;
  borderColor: string;
};

type WebColors = {
  '--background-color': string;
  '--container-bg': string;
  '--text-color': string;
  '--border-color': string;
};

type BaseTheme = {
  light: BaseColors;
  dark: BaseColors;
};

type WebTheme = {
  light: WebColors;
  dark: WebColors;
};

const baseTheme: BaseTheme = {
  light: {
    backgroundColor: '#f5f5f5',
    containerBg: '#ffffff',
    textColor: '#000000',
    borderColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    containerBg: '#2d2d2d',
    textColor: '#ffffff',
    borderColor: '#404040',
  },
};

const webTheme: WebTheme = {
  light: {
    '--background-color': baseTheme.light.backgroundColor,
    '--container-bg': baseTheme.light.containerBg,
    '--text-color': baseTheme.light.textColor,
    '--border-color': baseTheme.light.borderColor,
  },
  dark: {
    '--background-color': baseTheme.dark.backgroundColor,
    '--container-bg': baseTheme.dark.containerBg,
    '--text-color': baseTheme.dark.textColor,
    '--border-color': baseTheme.dark.borderColor,
  },
};

export type Theme = BaseTheme | WebTheme;
export type ThemeMode = 'light' | 'dark';

export const getThemeColors = (mode: ThemeMode) => 
  Platform.OS === 'web' ? webTheme[mode] : baseTheme[mode];

export const getColor = (colors: BaseColors | WebColors, key: keyof BaseColors) => {
  if (Platform.OS === 'web') {
    const webKey = `--${key}` as keyof WebColors;
    return (colors as WebColors)[webKey];
  }
  return (colors as BaseColors)[key];
};

export const theme = Platform.OS === 'web' ? webTheme : baseTheme; 