import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'gfc_lang',
      caches: ['localStorage'],
    },
  });

const applyDirection = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
  document.documentElement.classList.toggle('font-ar', lng === 'ar');
  document.documentElement.classList.toggle('font-sans', lng !== 'ar');
};

applyDirection(i18n.language);
i18n.on('languageChanged', applyDirection);

export default i18n;
