import React from 'react';
import Question from './Question';

const QuestionaryCategory = ({ category, questions }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const onChange = (e) => {console.log(e.target.value)};
  const onClick = (e) => {console.log(e.target.value)};
  const onPrev = () => {currentQuestion == 0 ? setCurrentQuestion(currentQuestion - 1) : setCurrentQuestion(0)};
  const onNext = () => { currentQuestion < questions.length ? setCurrentQuestion(currentQuestion + 1) : setCurrentQuestion(questions.length-1)};

  return (
    <div>
      <h1>{category}</h1>
      <ul>
        <Question 
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onChange={onChange}
          onClick={onClick}
          onPrev={onPrev}
          onNext={onNext}
        />
      </ul>
    </div>
  );
};

export default QuestionaryCategory;
