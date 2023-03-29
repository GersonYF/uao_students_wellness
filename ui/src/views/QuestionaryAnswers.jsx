import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useUserContext } from '../UserContext';
import QuestionaryBody from '../components/QuestionaryBody';
import QuestionaryCategory from '../components/QuestionaryCategory';
import { Container, Row, Col } from 'react-bootstrap';
import { API_getQuestionaryAnswers, API_createQuestionary } from '../api';
import CategoryList from '../components/CategoryList';

const QuestionaryAnswers = () => {
  const { answers, user, selectedQuestionary, setAnswers } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const answers = await API_getQuestionaryAnswers(user.token, selectedQuestionary.id);
        setAnswers(answers);
      }
    }
    fetchData();
  }, [setCategories]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      <Container>
        <Row>
          {answers.map((answer) => (
            <Col sm={6}>
              <h3>{answer.Question.text}</h3>
              <p>{answer.answer}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default QuestionaryAnswers;
