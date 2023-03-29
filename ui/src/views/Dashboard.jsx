// src/components/TrelloBoard.js

import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import ModalSke from '../components/ModalSke';
import DashboardBody from '../components/DashboardBody';
import { useUserContext } from '../UserContext';
import { API_fetchQuestionaries, API_getQuestionaryCategoryCounts } from '../api';

const Dashboard = () => {
  const { user, showModal, setShowModal, setQuestionaries, setQuestionaryStats } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const onHide = () => setShowModal(false);
  const onSubmit = async (task) => {}

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await API_getQuestionaryCategoryCounts(user.token);
        setQuestionaryStats(stats);
        const  questionaries = await API_fetchQuestionaries(user.token);
        setQuestionaries(questionaries);
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
    <>
      <DashboardBody />
      <ModalSke show={showModal} onHide={onHide} />
    </>
  )
};

export default Dashboard;