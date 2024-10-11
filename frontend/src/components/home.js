import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

function Home({ onNewQuiz, onLoadQuiz }) {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a la aplicación de creación de cuestionarios
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Aquí puedes crear preguntas para un cuestionario en formato Aiken para Moodle.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onNewQuiz} sx={{ mr: 2 }}>
          Nuevo
        </Button>
        <Button variant="outlined" color="secondary" onClick={onLoadQuiz}>
          Cargar
        </Button>
      </Box>
    </Container>
  );
}

export default Home;