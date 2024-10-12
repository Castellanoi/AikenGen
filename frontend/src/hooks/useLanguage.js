import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('es'); // Valor predeterminado

  // Acceder a los métodos expuestos por el preload
  const { readConfig, writeConfig } = window.api;

  // Cargar el idioma desde la configuración al iniciar
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await readConfig(); // Leer la configuración
        if (config && config.language) {
          setLanguage(config.language);
          i18n.changeLanguage(config.language);
        }
      } catch (error) {
        console.error('Error leyendo la configuración:', error);
      }
    };

    loadConfig(); // Ejecutamos la función asíncrona
  }, [i18n]);

  // Cambiar el idioma y guardarlo en la configuración
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    // Guardar el idioma seleccionado en la configuración
    writeConfig({ language: selectedLanguage });
  };

  return {
    language,
    handleLanguageChange,
  };
};

export default useLanguage;
