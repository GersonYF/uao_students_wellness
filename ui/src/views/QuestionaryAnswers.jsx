import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useUserContext } from '../UserContext';
import QuestionaryBody from '../components/QuestionaryBody';
import QuestionaryCategory from '../components/QuestionaryCategory';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { API_getQuestionaryAnswers } from '../api';
import CategoryList from '../components/CategoryList';

const QuestionaryAnswers = () => {
  const { answers, user, selectedQuestionary, setAnswers } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const answers = await API_getQuestionaryAnswers(user.token, selectedQuestionary.id);
        setAnswers(answers);
      }catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if(answers.length === 0) {
    return (
      <Container>
        <Row>
          <Alert key={"not-found-answers"} variant={"warning"}>
            Este formulario no tiene respuestas!
          </Alert>
        </Row>
      </Container>
    )
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
