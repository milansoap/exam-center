import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomModal = ({ show, exam, handleClose, handleConfirm }) => {
  const [updatedExam, setUpdatedExam] = useState(exam);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExam((prevExam) => ({
      ...prevExam,
      [name]: value,
    }));
  };

  const handleConfirmClick = () => {
    handleConfirm(updatedExam);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group controlId="examField">
          <Form.Label>Exam Field</Form.Label>
          <Form.Control
            as="input"
            type="text"
            name="field"
            value={updatedExam.field}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="examDate">
          <Form.Label>Exam Date</Form.Label>
          <Form.Control
            as="input"
            type="date"
            name="date"
            value={updatedExam.date}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="examLocation">
          <Form.Label>Exam Location</Form.Label>
          <Form.Control
            as="input"
            type="text"
            name="location"
            value={updatedExam.location}
            onChange={handleFieldChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
