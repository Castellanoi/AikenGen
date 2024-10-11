/*
 * Este archivo es parte de AikenGen.
 *
 * AikenGen es software libre: puedes redistribuirlo y/o modificarlo
 * bajo los términos de la Licencia Pública General de GNU, ya sea la versión 3
 * de la licencia, o (a tu elección) cualquier versión posterior.
 *
 * Este programa se distribuye con la esperanza de que sea útil, pero SIN NINGUNA
 * GARANTÍA; incluso sin la garantía implícita de COMERCIALIZACIÓN o IDONEIDAD
 * PARA UN PROPÓSITO PARTICULAR. Consulta la Licencia Pública General de GNU
 * para más detalles.
 */

import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './components/home';
import Navbar from './components/Navbar';

function App() {
  // Estado para el tema claro/oscuro
  const [themeMode, setThemeMode] = useState('light');

  // Función para alternar entre tema claro/oscuro
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Crear el tema dinámico
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onToggleTheme={toggleTheme} currentTheme={themeMode} />
      <Home onNewQuiz={() => console.log('Nuevo Quiz')} onLoadQuiz={() => console.log('Cargar Quiz')} />
    </ThemeProvider>
  );
}

export default App;