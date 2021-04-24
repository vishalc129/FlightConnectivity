import LocalizedStrings from 'react-localization';
import en from '../assets/i18n/en.json';
let files: any = {
  en
};
let str: {
  en: any;
}

const context = (!process.env.JEST_WORKER_ID || process.env.NODE_ENV !== 'test') && require.context('./../assets/i18n/', false);
if (context) {
  files = [];
  context.keys().forEach((filename) => {
    if (!filename.endsWith(".json")) {
      files[filename.substr(2)] = context(filename);
    }
  });
}

str = files;
export const Locale = new LocalizedStrings(str);
Locale.setLanguage('en');