import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Radio, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Workspace({ onBack }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const questionInputRef = useRef(null);
  const answerInputRef = useRef(null);
  const answerRefs = useRef([]);

  // Navegación de inputs con flechas
  const handleNavigation = (e, index, refType) => {
    if (e.key === 'ArrowDown') {
      if (refType === 'question') {
        answerInputRef.current?.focus();
      } else if (refType === 'newAnswer') {
        if (answers.length > 0) {
          answerRefs.current[0]?.focus();
        }
      } else if (index < answers.length - 1) {
        answerRefs.current[index + 1]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      if (refType === 'newAnswer') {
        questionInputRef.current?.focus();
      } else if (index === 0) {
        answerInputRef.current?.focus();
      } else {
        answerRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      if (refType === 'question') {
        answerInputRef.current?.focus();
      } else if (refType === 'answer') {
        answerInputRef.current?.focus();
      }
    }
  };

  const handleAddAnswer = (e) => {
    if (e.key === 'Enter' && answerText) {
      setAnswers((prev) => [...prev, answerText]);
      setAnswerText('');
    }
  };

  const handleSaveQuestion = () => {
    console.log('Pregunta:', question);
    console.log('Respuestas:', answers, 'Correcta:', correctAnswerIndex);

    setQuestion('');
    setAnswers([]);
    setCorrectAnswerIndex(null);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleDeleteAnswer = (index) => {
    setIsDeleting(true); // Indica que estamos eliminando
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);

    // Si la respuesta eliminada era la correcta, se debe limpiar el índice correcto
    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    } else if (correctAnswerIndex > index) {
      // Ajustar el índice si la respuesta correcta estaba después de la eliminada
      setCorrectAnswerIndex((prevIndex) => prevIndex - 1);
    }
    
    // Restablecer el estado después de un breve retraso
    setTimeout(() => {
      setIsDeleting(false);
    }, 0);
  };

  const handleRadioChange = (index) => {
    if (!isDeleting) { // Solo cambia el índice si no se está eliminando
      setCorrectAnswerIndex(index);
    }
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
              inputRef={questionInputRef}
              onKeyDown={(e) => handleNavigation(e, null, 'question')}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 1, minWidth: '40px', textAlign: 'right' }}>
              {String.fromCharCode(97 + answers.length)}.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Respuesta"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              onKeyDown={(e) => {
                handleAddAnswer(e);
                handleNavigation(e, null, 'newAnswer');
              }}
              inputRef={answerInputRef}
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
                    checked={correctAnswerIndex === index}
                    onChange={() => handleRadioChange(index)} // Cambiar aquí
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
                      inputRef={(el) => (answerRefs.current[index] = el)}
                      onKeyDown={(e) => handleNavigation(e, index, 'answer')}
                    />
                    <Box
                      sx={{ ml: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => handleDeleteAnswer(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            </Box>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={onBack}>
          Atrás
        </Button>
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
        <Box>{/* Contenido que genera scroll */}</Box>
      </Box>
    </Box>
  );
}

export default Workspace;