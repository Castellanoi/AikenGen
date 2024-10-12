import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { loadLocales } from '../i18n';
import useLanguage from '../hooks/useLanguage';

function Home({ onNewQuiz, onLoadQuiz }) {
  const { t } = useTranslation();
  const { language, handleLanguageChange } = useLanguage();
  const availableLanguages = loadLocales();

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        {t('homeTitle')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('homeSubtitle')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onNewQuiz} sx={{ mr: 2 }} disableElevation>
          {t('actNewQuiz')}
        </Button>
        <Button variant="outlined" color="primary" onClick={onLoadQuiz}>
          {t('actLoadQuiz')}
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
          <InputLabel id="language-label">{t('labLanguage')}</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={language}
            label={t('labLanguage')}
            onChange={handleLanguageChange}
          >
            {Object.keys(availableLanguages).map((code) => (
              <MenuItem key={code} value={code}>
                {availableLanguages[code].translation.lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Home;
