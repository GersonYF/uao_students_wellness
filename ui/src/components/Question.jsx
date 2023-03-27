import React from 'react';
import { Form, ProgressBar, Button } from 'react-bootstrap';

const Question = ({ id, question, options, currentQuestion, totalQuestions, onChange, onClick, onPrev, onNext }) => {
  const percentComplete = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <div>
      <div className="text-center">
        {currentQuestion > 1 && (
          <Button variant="link" className="mx-2" onClick={onPrev}>
            <i class="bi bi-chevron-double-left"></i>
          </Button>
        )}
        {currentQuestion < totalQuestions && (
          <Button variant="link" className="mx-2" onClick={onNext}>
            <i class="bi bi-chevron-double-right"></i>
          </Button>
        )}
      </div>
      <ProgressBar now={percentComplete} label={`${currentQuestion} of ${totalQuestions}`} />
      <h4>Question {id}: {question}</h4>
      {options && options.length > 0 ? (
        <Form>
          <Form.Group>
            {options.map((option, index) => (
              <div key={index} className="form-check form-check-inline">
                <Form.Check
                  type="radio"
                  name={`option-${id}`}
                  id={`option-${id}-${index}`}
                  label={option}
                  onChange={onChange}
                  onClick={onClick}
                />
              </div>
            ))}
          </Form.Group>
        </Form>
      ) : (
        <Form>
          <Form.Group controlId={`answer-${id}`}>
            <Form.Label>Tu respuesta</Form.Label>
            <Form.Control type="text" placeholder="Tu respuesta" onChange={onChange} onClick={onClick} />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default Question;
