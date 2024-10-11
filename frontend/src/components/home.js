import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción
import { Container, Typography, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { loadLocales } from '../i18n'; // Ajusta la ruta según la ubicación de i18n.js

function Home({ onNewQuiz, onLoadQuiz }) {
  const { t, i18n } = useTranslation();  // Obtener la función t para acceder a las traducciones
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es'); // Estado para el idioma
  const availableLanguages = loadLocales(); // Usa loadLocales para obtener idiomas disponibles

  // Cambiar el idioma y guardarlo en localStorage
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Guarda el idioma seleccionado
  };

  // Cargar el idioma desde localStorage al iniciar la aplicación
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
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
