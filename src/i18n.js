// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import en from './locales/en/translation.json';
import ua from './locales/ua/translation.json';

// Обираємо стартову мову: localStorage → window.__APP_LANG → мова браузера
const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const browser = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'ua';
const initialLang = stored || (typeof window !== 'undefined' && window.__APP_LANG) || browser;

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ua: { translation: ua },
            en: { translation: en },
        },
        lng: initialLang,
        fallbackLng: 'ua',
        initImmediate: false,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnEmptyString: false,
    });

// Ставимо правильний <html lang="...">
if (typeof document !== 'undefined') {
    document.documentElement.lang = i18n.language?.startsWith('en') ? 'en' : 'uk';
    i18n.on('languageChanged', (lng) => {
        document.documentElement.lang = lng?.startsWith('en') ? 'en' : 'uk';
    });
}

export default i18n;
