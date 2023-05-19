import React from 'react';
import { Form, ProgressBar, Button, Col, Row } from 'react-bootstrap';

const Question = ({ question, currentQuestion, totalQuestions, onChange, onClick, onPrev, onNext }) => {
  const percentComplete = ((currentQuestion+1) / totalQuestions) * 100 
  console.log(percentComplete, "PERCENT COMPLETE")
  return (
    <div style={{marginTop: "20px"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px"}}>
      <Button variant="primary" className="mx-2" onClick={onPrev} disabled={currentQuestion === 0}>
        <i className="bi bi-chevron-double-left"></i>
      </Button>
        <Button variant="primary" className="mx-2" onClick={onNext}>
          <i className="bi bi-chevron-double-right"></i>
        </Button>
      </div>
      <ProgressBar now={percentComplete} label={`${currentQuestion+1} of ${totalQuestions}`} />
      <Row style={{marginTop: "20px", height: "400px"}}>
        <Col xs={{span: 4, offset: 1}} style={{borderRight: "1px solid #CCC", boxShadow: "2px 0 3px #CCC", display: "flex", alignItems: "center"}}>
          <h4>{question.text || "Pregunta errada"}</h4>
        </Col>
        <Col xs={{span: 6}}>
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
                <Form.Control as="textarea" rows={10} style={{resize: "none"}} placeholder="Tu respuesta" onChange={onChange} onClick={onClick} />
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Question;
