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

import React from 'react';
import Home from './components/home';

function App() {
  const handleNewQuiz = () => {
    console.log('Crear nuevo cuestionario');
    // Aquí iría la lógica para comenzar un nuevo cuestionario
  };

  const handleLoadQuiz = () => {
    console.log('Cargar cuestionario existente');
    // Aquí iría la lógica para cargar un archivo de cuestionario
  };

  return (
    <div className="App">
      <Home onNewQuiz={handleNewQuiz} onLoadQuiz={handleLoadQuiz} />
    </div>
  );
}

export default App;