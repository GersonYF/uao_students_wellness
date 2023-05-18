// src/components/ModalSke.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalSke = ({ show, title, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalSke;
