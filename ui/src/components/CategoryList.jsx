import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
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
    <ul>
      {categories.map((category) => (
        <li key={category.root_category} onClick={() => handleClick(category)}>
          {category.root_category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
