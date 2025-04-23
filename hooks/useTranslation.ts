import { useAppStore } from '../store/useAppStore';
import { translations } from '../constants/translations';

export const useTranslation = () => {
  const { language } = useAppStore();

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value as string;
  };

  return { t };
}; 