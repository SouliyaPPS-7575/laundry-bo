import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Check for localStorage in a browser environment
const lang = typeof window !== "undefined" && window.localStorage ? localStorage.getItem('lang') : null;

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: lang || 'en', // Default to 'en' if localStorage isn't accessible
    fallbackLng: 'en',
    returnNull: true,
    load: 'all',
    backend: {
      loadPath: '/locales/{{lng}}/translate.json',
    },
  });

export default i18next;