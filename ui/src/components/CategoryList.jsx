import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { Row, Card, Button } from 'react-bootstrap';
import { API_fetchQuestionsByCategory } from '../api';
import { categories_translations } from '../utils';

const CategoryList = () => {
  const { user, categories, selectedCategory, setSelectedCategory, setQuestions } = useUserContext();
  console.log(categories, "CATEGORIES")
  console.log(!!selectedCategory, "SELECTED CATEGORY")
  const handleClick = async (category) => {
    try {
      const response = await API_fetchQuestionsByCategory(user.token, category.root_category);
      setQuestions(response);
      setSelectedCategory(category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {categories.map((category) => (
        <Card style={{ width: '18rem', margin: "10px", borderBottom: "1px solid #CCC", paddingBottom: "10px" }} key={category.root_category}>
          <Card.Body>
            <Card.Title>{categories_translations[category.root_category]?.translation}</Card.Title>
            <Card.Text style={{height: '60px', marginTop: "10px"}}>
              {categories_translations[category.root_category]?.short_text}
            </Card.Text>
            <Button variant="primary" onClick={() => handleClick(category)}>Escoger</Button>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
};

export default CategoryList;
