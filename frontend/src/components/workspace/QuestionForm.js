// QuestionForm.js
import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { handleNavigation, handleAddAnswer, handleDeleteAnswer } from './helpers';

const QuestionForm = ({ questionCount, setQuestionCount, question, setQuestion, answerText, setAnswerText, answers, setAnswers, correctAnswerIndex, setCorrectAnswerIndex, isDeleting }) => {
  const questionInputRef = useRef(null);
  const answerInputRef = useRef(null);
  const answerRefs = useRef([]);

  const onKeyDownHandler = (e, index, refType) => {
    handleNavigation(e, index, refType, questionInputRef, answerInputRef, answerRefs);
  };

  const onAddAnswerHandler = (e) => {
    const newAnswerText = handleAddAnswer(e, answerText, setAnswers);
    setAnswerText(newAnswerText);
  };

  return (
    <Box sx={{ padding: 2 }}>
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
        onKeyDown={(e) => onKeyDownHandler(e, null, 'question')}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 1, minWidth: '40px', textAlign: 'right' }}>
          {String.fromCharCode(65 + answers.length)}.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Respuesta"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          onKeyDown={(e) => {
            onAddAnswerHandler(e);
            onKeyDownHandler(e, null, 'newAnswer');
          }}
          inputRef={answerInputRef}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained">Guardar Pregunta</Button>
      </Box>

      {answers.map((answer, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FormControlLabel
            control={<Radio checked={correctAnswerIndex === index} onChange={() => handleRadioChange(index)} />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 1, minWidth: '20px', textAlign: 'right' }}>
                  {String.fromCharCode(65 + index)}):
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
                  onKeyDown={(e) => onKeyDownHandler(e, index, 'answer')}
                />
                <Box
                  sx={{ ml: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => handleDeleteAnswer(index, answers, correctAnswerIndex, setAnswers, setIsDeleting)}
                >
                  <CloseIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </Box>
      ))}
    </Box>
  );
};

export default QuestionForm;
