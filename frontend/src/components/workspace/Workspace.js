// Workspace.js
import React, { useState, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import QuestionForm from './QuestionForm';
import Preview from './Preview';

const Workspace = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // o 'list'
  
  const [question, setQuestion] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    const { question, answers, correctAnswerIndex } = savedQuestions[index];
    setQuestion(question);
    setAnswers(answers);
    setCorrectAnswerIndex(correctAnswerIndex);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = savedQuestions.filter((_, i) => i !== index);
    setSavedQuestions(updatedQuestions);
    setQuestionCount((prevCount) => prevCount - 1);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleSaveQuestion = () => {
    const newQuestion = { question, answers, correctAnswerIndex };
    setSavedQuestions((prev) => [...prev, newQuestion]);
    setQuestionCount((prevCount) => prevCount + 1);
    setQuestion('');
    setAnswers([]);
    setAnswerText('');
    setCorrectAnswerIndex(null);
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
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <QuestionForm
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            question={question}
            setQuestion={setQuestion}
            answerText={answerText}
            setAnswerText={setAnswerText}
            answers={answers}
            setAnswers={setAnswers}
            correctAnswerIndex={correctAnswerIndex}
            setCorrectAnswerIndex={setCorrectAnswerIndex}
            handleSaveQuestion={handleSaveQuestion}
          />
        </Paper>
      </Box>
      <Box
        sx={{
          width: '50%',
          overflowY: 'auto',
          padding: 2,
        }}
      >
        <Preview
          savedQuestions={savedQuestions}
          viewMode={viewMode}
          editingIndex={editingIndex}
          handleEditQuestion={handleEditQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </Box>
    </Box>
  );
};

export default Workspace;
