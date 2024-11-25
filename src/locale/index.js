import { createI18n } from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';
import ja from './ja-JP';
import tw from './zh-TW';
import fr from './fr-FR';


export const LOCALE_OPTIONS = [
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁体中文', value: 'zh-TW' },
  { label: '日本語', value: 'ja-JP' },
  { label: 'English', value: 'en-US' },
  { label: 'Français', value: 'fr-FR' },
];
const userLanguage = navigator.language || navigator.userLanguage;
const defaultLocale = localStorage.getItem('arco-locale') || userLanguage;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  allowComposition: true,
  messages: {
    'en-US': en,
    'zh-CN': cn,
    'ja-JP': ja,
    'zh-TW': tw,
    'fr-FR': fr,
  },
});

export default i18n;
