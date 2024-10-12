import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Workspace({ onBack }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sección de la izquierda para las preguntas */}
      <Box
        sx={{
          width: '50%',
          borderRight: '1px solid gray',
          padding: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Preguntas
        </Typography>
        <Button variant="contained" color="primary" onClick={onBack}>
          Atrás
        </Button>
        {/* Aquí puedes agregar las preguntas */}
      </Box>

      {/* Sección de la derecha para la vista previa con scroll */}
      <Box
        sx={{
          width: '50%',
          overflowY: 'auto', // Solo aparece cuando sea necesario
          padding: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Vista Previa
        </Typography>
        {/* Contenido largo para hacer scroll */}
        <Box>
          {/* Contenido que genera scroll */}
        </Box>
      </Box>
    </Box>
  );
}

export default Workspace;
