import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Radio, FormControlLabel, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Workspace({ onBack }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const questionInputRef = useRef(null);
  const answerInputRef = useRef(null);
  const answerRefs = useRef([]);

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
    const newQuestion = {
      question,
      answers,
      correctAnswerIndex,
    };

    setSavedQuestions((prev) => [...prev, newQuestion]);
    setQuestion('');
    setAnswers([]);
    setCorrectAnswerIndex(null);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleDeleteAnswer = (index) => {
    setIsDeleting(true);
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);

    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    } else if (correctAnswerIndex > index) {
      setCorrectAnswerIndex((prevIndex) => prevIndex - 1);
    }

    setTimeout(() => {
      setIsDeleting(false);
    }, 0);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = savedQuestions.filter((_, i) => i !== index);
    setSavedQuestions(updatedQuestions);

    setQuestionCount((prevCount) => prevCount - 1);

    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleRadioChange = (index) => {
    if (!isDeleting) {
      setCorrectAnswerIndex(index);
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'card' ? 'aiken' : 'card'));
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEditedQuestion = (index, editedQuestion, editedAnswers, editedCorrectIndex) => {
    const updatedQuestions = [...savedQuestions];
    updatedQuestions[index] = {
      question: editedQuestion,
      answers: editedAnswers,
      correctAnswerIndex: editedCorrectIndex,
    };
    setSavedQuestions(updatedQuestions);
    setEditingIndex(null);
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
              {String.fromCharCode(65 + answers.length)}.
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
                    onChange={() => handleRadioChange(index)}
                  />
                }
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

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Modo Tarjeta
          </Typography>
          <Switch checked={viewMode === 'aiken'} onChange={toggleViewMode} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Modo Aiken
          </Typography>
        </Box>

        {savedQuestions.map((savedQuestion, index) => (
          <Box key={index} sx={{ mt: 2, position: 'relative', border: '1px solid gray', p: 2 }}>
            {viewMode === 'card' ? (
              editingIndex === index ? (
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    value={savedQuestion.question}
                    sx={{ mb: 1 }}
                    onChange={(e) => {
                      const updatedQuestions = [...savedQuestions];
                      updatedQuestions[index].question = e.target.value;
                      setSavedQuestions(updatedQuestions);
                    }}
                  />
                  {savedQuestion.answers.map((answer, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ mr: 1, minWidth: '40px', textAlign: 'right' }}>
                        {String.fromCharCode(65 + i)}.
                      </Typography>
                      <TextField
                        fullWidth
                        value={answer}
                        onChange={(e) => {
                          const updatedAnswers = [...savedQuestion.answers];
                          updatedAnswers[i] = e.target.value;

                          const updatedQuestions = [...savedQuestions];
                          updatedQuestions[index].answers = updatedAnswers; // Aquí actualizas las respuestas dentro de la pregunta
                          setSavedQuestions(updatedQuestions); // Y finalmente actualizas todo el conjunto de preguntas
                        }}
                      />

                      <FormControlLabel
                        control={<Radio checked={savedQuestion.correctAnswerIndex === i} />}
                        label=""
                        onClick={() => {
                          const updatedQuestions = [...savedQuestions];
                          updatedQuestions[index].correctAnswerIndex = i;
                          setSavedQuestions(updatedQuestions);
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleSaveEditedQuestion(index, savedQuestion.question, savedQuestion.answers, savedQuestion.correctAnswerIndex)
                    }
                  >
                    Guardar cambios
                  </Button>
                </Box>
              ) : (
                <Box>
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
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditQuestion(index)}
                      startIcon={<EditIcon />}
                      sx={{ mr: 2 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteQuestion(index)}
                      startIcon={<CloseIcon />}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Box>
              )
            ) : (
              <Box>
                <Typography variant="body1">
                  {savedQuestion.question}
                </Typography>
                {savedQuestion.answers.map((answer, answerIndex) => (
                  <Typography key={answerIndex}>
                    {String.fromCharCode(65 + answerIndex)}) {answer}
                  </Typography>
                ))}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {`ANSWER: ${String.fromCharCode(65 + savedQuestion.correctAnswerIndex)}`}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Workspace;
