import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import GenderBarChart from './GenderBarChart';
import Loading from './Loading';
import { API_getDashboardCountGender } from '../api';
import { useUserContext } from '../UserContext';
import GenderSmokeChart from './GenderSmokePieChart';
import AlcoholChart from './AlcoholChart';
import AlcoholFrecuencyChart from './AlcoholFrecuencyChart';
import SleepQualityChart from './SleepQualityChart';
import SleepClassificationChart from './SleepClassificationChart';
import MentalHealthChart from './MentalHealthChart';

const StaffDashboard = () => {
  const [key, setKey] = useState('perfil');
  const { user, genderCounts, setGenderCounts } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const gender = await API_getDashboardCountGender(user.token);
        setGenderCounts(gender)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container style={{backgroundColor: "#FFF", paddingTop: "20px"}}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="perfil" title="Perfil">
            <Row>
              <Col xs={5}>
                <GenderBarChart data={genderCounts} />
              </Col>
              <Col xs={7}>
                <MentalHealthChart data={genderCounts} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="sueno" title="Sueño">
            <Row>
              <Col xs={7}>
                <SleepQualityChart data={genderCounts} />
              </Col>
              <Col xs={5}>
                <SleepClassificationChart data={genderCounts} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="consumo" title="Consumo">
            <Row style={{marginTop: "20px"}}>
              <Col xs={5}>
                <GenderSmokeChart data={genderCounts} />
              </Col>
              <Col xs={{span: 7}}>
                <AlcoholFrecuencyChart data={genderCounts} />
              </Col>
            </Row>
            <Row style={{marginTop: "20px", marginBottom: "20px"}}>
              <Col xs={{span: 8, offset: 2}}>
                <AlcoholChart data={genderCounts} />
              </Col>
            </Row>
          </Tab>
        </Tabs>
    </Container>
  )
}

export default StaffDashboard