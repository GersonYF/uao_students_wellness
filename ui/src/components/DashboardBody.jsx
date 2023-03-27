import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RadarChart from './RadarChart';
import QuestionariesTable from './QuestionariesTable';
import BarChartComponent from './BarChart';

const DashboardBody = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={4}>
          <RadarChart/>
          <BarChartComponent />
        </Col>
        <Col>
          <QuestionariesTable questionaries={[{id: 1, title: "Demo 1", date: "123456"}]} />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardBody;
