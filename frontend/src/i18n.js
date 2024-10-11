import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Cargar todos los archivos de traducción desde locales
export function loadLocales() {
  const locales = {};
  const context = require.context('./locales', true, /\.json$/); // Busca todos los archivos .json en la carpeta locales
  context.keys().forEach((key) => {
    const localeName = key.replace('./', '').replace('.json', ''); // Obtener el nombre del idioma, ej: es, en
    locales[localeName] = { translation: context(key) }; // Asignar las traducciones
  });
  return locales;
}

// Inicializar i18n
i18n
  .use(initReactI18next)
  .init({
    resources: loadLocales(),
    lng: localStorage.getItem('language') || 'es', // Idioma inicial desde localStorage
    fallbackLng: 'en',  // Idioma de respaldo
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
