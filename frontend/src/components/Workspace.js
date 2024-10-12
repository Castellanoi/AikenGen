// src/components/Workspace.js
import React from 'react';
import { Typography, Button } from '@mui/material';

function Workspace({ onBack }) { // Recibe la función onBack
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Espacio de Trabajo
      </Typography>
      {/* Aquí puedes agregar más contenido y funcionalidad para el espacio de trabajo */}
      <Button variant="outlined" onClick={onBack}>
        Volver a Home
      </Button>
    </div>
  );
}

export default Workspace;
