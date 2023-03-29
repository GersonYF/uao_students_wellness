import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { Row, Col } from 'react-bootstrap';
import { API_fetchQuestionsByCategory } from '../api';

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
        <Col md={4} key={category.root_category} onClick={() => handleClick(category)}>
          {category.root_category}
        </Col>
      ))}
    </Row>
  );
};

export default CategoryList;
