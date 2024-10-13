import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Radio, FormControlLabel } from '@mui/material';

function Workspace({ onBack }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);

  const handleAddAnswer = (e) => {
    if (e.key === 'Enter' && answerText) {
      setAnswers((prev) => [...prev, answerText]);
      setAnswerText('');
    }
  };

  const handleSaveQuestion = () => {
    // Lógica para guardar la pregunta y respuestas
    console.log('Pregunta:', question);
    console.log('Respuestas:', answers, 'Correctas:', correctAnswers);

    // Limpiar los campos
    setQuestion('');
    setAnswers([]);
    setCorrectAnswers([]);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 1, minWidth: '40px', textAlign: 'right' }}>
              {questionCount}.
            </Typography>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              label="Pregunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 1, minWidth: '40px', textAlign: 'right' }}>
              {String.fromCharCode(97 + answers.length)}.
            </Typography>
            <TextField
              variant="outlined"
              label="Respuesta"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              onKeyDown={handleAddAnswer}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleSaveQuestion}>
              Guardar Pregunta
            </Button>
          </Box>

          {answers.map((answer, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={correctAnswers.includes(index)}
                    onChange={() => {
                      if (correctAnswers.includes(index)) {
                        setCorrectAnswers(correctAnswers.filter((i) => i !== index));
                      } else {
                        setCorrectAnswers((prev) => [...prev, index]);
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 1, minWidth: '20px', textAlign: 'right' }}>
                      {String.fromCharCode(97 + index)}):
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={answer}
                      onChange={(e) => {
                        const updatedAnswers = [...answers];
                        updatedAnswers[index] = e.target.value;
                        setAnswers(updatedAnswers);
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Box>
                }
              />
            </Box>
          ))}

        </Box>
        <Button variant="contained" color="primary" onClick={onBack}>
          Atrás
        </Button>
        {/* Aquí puedes agregar las preguntas */}
      </Box>

      <Box
        sx={{
          width: '50%',
          overflowY: 'auto',
          padding: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Vista Previa
        </Typography>
        <Box>
          {/* Contenido que genera scroll */}
        </Box>
      </Box>
    </Box>
  );
}

export default Workspace;
