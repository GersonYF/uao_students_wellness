import React from 'react';

const QuestionaryBody = ({ title, date, categories }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <ul>
        {categories.map((category, key) => (
          <li key={`category-${key}`}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionaryBody;
