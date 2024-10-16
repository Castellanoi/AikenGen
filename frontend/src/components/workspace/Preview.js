// Preview.js (continuación)
import React from 'react';
import { Box, Typography, Paper, Fab, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Preview = ({ savedQuestions, viewMode, editingIndex, handleEditQuestion, handleDeleteQuestion }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Vista Previa
      </Typography>

      {savedQuestions.map((savedQuestion, index) => (
        <Paper key={index} variant='outlined' sx={{ mt: 2, position: 'relative' }}>
          {editingIndex === index ? (
            // Aquí iría el código para la edición de preguntas, similar a QuestionForm
            <Typography variant="h6">Editando Pregunta {index + 1}</Typography>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">{index + 1}. {savedQuestion.question}</Typography>
              {savedQuestion.answers.map((answer, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    {String.fromCharCode(65 + i)}. {answer}
                  </Typography>
                  {savedQuestion.correctAnswerIndex === i && (
                    <Typography variant="body1" sx={{ color: 'green', ml: 1, display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon fontSize="small" />
                    </Typography>
                  )}
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab size='medium' color="primary" onClick={() => handleEditQuestion(index)} sx={{ mr: 1 }}>
                  <EditIcon />
                </Fab>
                <Fab size='medium' color="error" onClick={() => handleDeleteQuestion(index)} sx={{ mr: 1 }}>
                  <CloseIcon />
                </Fab>
              </Box>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default Preview;
