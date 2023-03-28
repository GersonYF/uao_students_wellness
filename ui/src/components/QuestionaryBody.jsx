import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../UserContext';
import { Container, Row, Col } from 'react-bootstrap';
import { API_fetchQuestionsByCategory } from '../api';
import Question from './Question';

const QuestionaryBody = () => {
  const { user, categories, questions, selectedCategory, setSelectedCategory, setQuestions } = useUserContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  

  return (
    <Container>
      {!!selectedCategory && (
        <Row>
          <h2>{selectedCategory.root_category}</h2>
          <Question 
            question={questions[questionIndex]}
            currentQuestion={questionIndex}
            totalQuestions={questions.length}
            onChange={(evt) => console.log(evt.target.value)}
            onClick={(evt) => console.log(evt.target.value)}
            onPrev={() => {
              if (questionIndex === 0) return;
              setQuestionIndex(questionIndex - 1)
            }}
            onNext={() => {
              if (questionIndex === questions.length - 1) return;
              setQuestionIndex(questionIndex + 1)
            }}
          />
        </Row>
      )}
    </Container>
  );
};

export default QuestionaryBody;
