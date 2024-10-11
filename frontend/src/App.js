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