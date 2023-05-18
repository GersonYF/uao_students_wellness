import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GenderBarChart from './GenderBarChart';
import Loading from './Loading';
import { API_getDashboardCountGender } from '../api';
import { useUserContext } from '../UserContext';
import GenderSmokeChart from './GenderSmokePieChart';

const StaffDashboard = () => {

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
      <Row>
        <Col xs={6}>
          <GenderBarChart data={genderCounts} />
        </Col>
        <Col xs={6}>
          <GenderSmokeChart data={genderCounts} />
        </Col>
      </Row>
    </Container>
    
  )
}

export default StaffDashboard