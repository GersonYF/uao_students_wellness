import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RadarChart from './RadarChart';
import QuestionariesTable from './QuestionariesTable';
import BarChartComponent from './BarChart';
import { useUserContext } from '../UserContext';
import { API_getQuestionary } from '../api';
import StaffDashboard from './StaffDashboard';

const DashboardBody = () => {
  const navigate = useNavigate();
  const { user, questionaries, questionaryStats, setSelectedQuestionary } = useUserContext();
  const onHandleView = async (id) => {
    const questionary = await API_getQuestionary(user.token, id);
    console.log(questionary, "The OG setup")
    setSelectedQuestionary(questionary);
    navigate('/answers'); // redirect to dashboard
  }

  if(user.is_staff){
    return (
      <StaffDashboard />
    )
  }

  return (
    <Container style={{backgroundColor: "#FFF", paddingTop: "20px"}}>
      <Row>
        {!user.is_staff && (<Col>
          <QuestionariesTable questionaries={questionaries} handleView={onHandleView} />
        </Col>)}
      </Row>
    </Container>
  );
};

export default DashboardBody;
