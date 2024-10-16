// helpers.js

export const handleNavigation = (e, index, refType, questionInputRef, answerInputRef, answerRefs) => {
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
  
  export const handleAddAnswer = (e, answerText, setAnswers) => {
    if (e.key === 'Enter' && answerText) {
      setAnswers((prev) => [...prev, answerText]);
      return '';
    }
    return answerText;
  };
  
  export const handleDeleteAnswer = (index, answers, correctAnswerIndex, setAnswers, setIsDeleting) => {
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
  
  export const handleDeleteQuestion = (index, savedQuestions, setSavedQuestions, setQuestionCount, editingIndex, setEditingIndex) => {
    const updatedQuestions = savedQuestions.filter((_, i) => i !== index);
    setSavedQuestions(updatedQuestions);
    setQuestionCount((prevCount) => prevCount - 1);
  
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };
  
  export const handleSaveEditedQuestion = (index, editedQuestion, editedAnswers, editedCorrectIndex, savedQuestions, setSavedQuestions) => {
    const updatedQuestions = [...savedQuestions];
    updatedQuestions[index] = {
      question: editedQuestion,
      answers: editedAnswers,
      correctAnswerIndex: editedCorrectIndex,
    };
    setSavedQuestions(updatedQuestions);
  };
  