import React from 'react';
import { Form, ProgressBar, Button } from 'react-bootstrap';

const Question = ({ question, currentQuestion, totalQuestions, onChange, onClick, onPrev, onNext }) => {
  const percentComplete = ((currentQuestion+1) / totalQuestions) * 100 
  console.log(percentComplete, "PERCENT COMPLETE")
  return (
    <div>
      <div className="text-center">
        {currentQuestion > 1 && (
          <Button variant="link" className="mx-2" onClick={onPrev}>
            <i className="bi bi-chevron-double-left"></i>
          </Button>
        )}
        <Button variant="link" className="mx-2" onClick={onNext}>
          <i className="bi bi-chevron-double-right"></i>
        </Button>
      </div>
      <ProgressBar now={percentComplete} label={`${currentQuestion+1} of ${totalQuestions}`} />
      <h4>{question.text || "Pregunta errada"}</h4>
      {question.options && question.options.length > 0 ? (
        <Form>
          <Form.Group>
            {question.options.map((option, index) => (
              <div key={index} className="form-check form-check-inline">
                <Form.Check
                  type="radio"
                  name={`option-${question.id}`}
                  id={`option-${question.id}-${index}`}
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
          <Form.Group controlId={`answer-${question.id}`}>
            <Form.Label>Tu respuesta</Form.Label>
            <Form.Control type="text" placeholder="Tu respuesta" onChange={onChange} onClick={onClick} />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default Question;
