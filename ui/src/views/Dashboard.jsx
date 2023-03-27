// src/components/TrelloBoard.js

import React, {useEffect, useState} from 'react';
import ModalSke from '../components/ModalSke';
import DashboardBody from '../components/DashboardBody';
import { useUserContext } from '../UserContext';
import { API_createTask, API_fetchAsignedTaks } from '../api';

const Dashboard = () => {
  const { user, showModal, setShowModal } = useUserContext();
  const onHide = () => setShowModal(false);
  const onSubmit = async (task) => {}

  return (
    <>
      <DashboardBody />
      <ModalSke show={showModal} onHide={onHide} />
    </>
  )
};

export default Dashboard;