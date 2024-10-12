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

import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Workspace from './components/Workspace';

function App() {
  // Acceder a los métodos expuestos por el preload
  const { readConfig, writeConfig } = window.api;
  // Estado para el tema claro/oscuro
  const [themeMode, setThemeMode] = useState('light');
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState(false);

  // Leer la configuración cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para leer la configuración
    const loadConfig = async () => {
      try {
        const config = await readConfig(); // Esperamos a que la promesa se resuelva
        if (config && config.themeMode) {
          setThemeMode(config.themeMode); // Si existe un tema guardado, lo aplicamos
        }
      } catch (error) {
        console.error('Error leyendo la configuración:', error);
      }
    };

    loadConfig(); // Ejecutamos la función asíncrona
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para alternar entre tema claro/oscuro
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newTheme = prevMode === 'light' ? 'dark' : 'light';

      // Guardar la configuración cada vez que se cambia el tema
      writeConfig({ themeMode: newTheme });

      return newTheme;
    });
  };

  const handleNewQuizClick = () => {
    setIsWorkspaceVisible(true); // Cambia a la vista de Workspace
  };

  const handleBackToHome = () => {
    setIsWorkspaceVisible(false); // Vuelve a la vista de Home
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
      <Navbar
        onToggleTheme={toggleTheme}
        currentTheme={themeMode}
        isWorkspace={isWorkspaceVisible}
      />
      {isWorkspaceVisible ? (
        <Workspace onBack={handleBackToHome} /> // Pasa la función para volver a Home
      ) : (
        <Home
          onNewQuiz={handleNewQuizClick}
          onLoadQuiz={() => console.log('Cargar Quiz')}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
