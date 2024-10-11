import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción
import { Container, Typography, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { loadLocales } from '../i18n'; // Ajusta la ruta según la ubicación de i18n.js

function Home({ onNewQuiz, onLoadQuiz }) {
  const { t, i18n } = useTranslation();  // Obtener la función t para acceder a las traducciones
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const availableLanguages = loadLocales(); // Usa loadLocales para obtener idiomas disponibles

  // Acceder a los métodos expuestos por el preload
  const { readConfig, writeConfig } = window.api;

  // Cambiar el idioma y guardarlo en la configuración
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    // Guardar el idioma seleccionado en la configuración
    writeConfig({ language: selectedLanguage });
  };

  // Cargar el idioma desde la configuración al iniciar la aplicación
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

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('instructions')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onNewQuiz} sx={{ mr: 2 }}>
          {t('newQuiz')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onLoadQuiz}>
          {t('loadQuiz')}
        </Button>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          width: 300,
          margin: '0 auto',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="language-label">{t('language')}</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={language}
            label={t('language')} // Asegúrate de pasar la prop "label"
            onChange={handleLanguageChange}
          >
            {Object.keys(availableLanguages).map((code) => (
              <MenuItem key={code} value={code}>
                {availableLanguages[code].translation.lang} {/* Muestra el nombre del idioma */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Home;
