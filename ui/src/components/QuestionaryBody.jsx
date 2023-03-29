import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../UserContext';
import { Container, Row, Col } from 'react-bootstrap';
import { API_addAnswersToQuestionary } from '../api';
import Question from './Question';

const QuestionaryBody = () => {
  const { user, selectedQuestionary, questions, selectedCategory, setSelectedCategory, setQuestions } = useUserContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  
  const onChange = (evt) => {
    console.log(evt.target.value);
    setUserAnswer(evt.target.value);
  }

  const onNext = async () => {
    if (userAnswer === "") return;
    // Guardar la respuesta del usuario
    const newAnswer = {
      answer: userAnswer,
      QuestionId: questions[questionIndex].id,
      QuestionaryId: selectedQuestionary.id,
    };
    // Agregar la nueva respuesta al estado
    // de respuestas (podrías usar un arreglo)
    // o enviarla al servidor aquí mismo.
    console.log(newAnswer);
    setAnswers([...answers, newAnswer]);
    // Avanzar a la siguiente pregunta
    if (questionIndex === questions.length - 1){
      const savedAnswers = await API_addAnswersToQuestionary(user.token, selectedQuestionary.id, answers);
      console.log(savedAnswers);
      setQuestions([]);
      setSelectedCategory(null);
      setAnswers([]);
      setQuestionIndex(0);
      setUserAnswer('');
    } else{
      setQuestionIndex(questionIndex + 1);
      // Actualizar la respuesta del usuario a vacío
      setUserAnswer('');
    }
    
  };
  

  return (
    <Container>
      {!!selectedCategory && (
        <Row>
          <h2>{selectedCategory.root_category}</h2>
          <Question 
            question={questions[questionIndex]}
            currentQuestion={questionIndex}
            totalQuestions={questions.length}
            onChange={onChange}
            onClick={(evt) => console.log(evt.target.value)}
            onPrev={() => {
              if (questionIndex === 0) return;
              setQuestionIndex(questionIndex - 1)
            }}
            onNext={onNext}
          />
        </Row>
      )}
    </Container>
  );
};

export default QuestionaryBody;
