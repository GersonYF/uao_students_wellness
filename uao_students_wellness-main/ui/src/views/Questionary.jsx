import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useUserContext } from '../UserContext';
import QuestionaryBody from '../components/QuestionaryBody';
import QuestionaryCategory from '../components/QuestionaryCategory';
import { Container, Row, Col } from 'react-bootstrap';
import { API_fetchQuestionCategories, API_createQuestionary } from '../api';
import CategoryList from '../components/CategoryList';

const Questionary = () => {
  const { user, selectedCategory, setCategories, setSelectedQuestionary } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const questionary = await API_createQuestionary(user.token, {title: `Cuestionario ${new Date().toLocaleString()}`})
        setSelectedQuestionary(questionary);
        const categories = await API_fetchQuestionCategories(user.token);
        setCategories(categories);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setCategories]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      <Container fluid>
        {!!selectedCategory === false && <Row>
          <Col xs={4}>
            <img src={process.env.PUBLIC_URL + 'nurse.svg'} alt="Enfermera" />
            <h1>Nuevo Ingreso</h1>
            <p>Escoge una de las siguientes opciones</p>
          </Col>
          <Col>
            <CategoryList />
          </Col>
        </Row>}
        {!!selectedCategory && (
          <Row>
            <Col>
              <QuestionaryBody />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Questionary;
