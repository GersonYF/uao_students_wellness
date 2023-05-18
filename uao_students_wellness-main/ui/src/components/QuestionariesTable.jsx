import React from 'react';
import { Table, Button } from 'react-bootstrap';

const QuestionariesTable = ({ questionaries, handleView }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {questionaries.map((questionary) => (
          <tr key={questionary.id}>
            <td>{questionary.id}</td>
            <td>{questionary.title}</td>
            <td>{questionary.created_at}</td>
            <td>
              <Button variant="primary" onClick={() => handleView(questionary.id)}>
                <i className="bi bi-eye"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default QuestionariesTable;
