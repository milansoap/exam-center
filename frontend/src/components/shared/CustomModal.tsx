import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomModal = ({ show, handleClose, handleConfirm, title, examId }) => {
    const [reason, setReason] = React.useState('');
  
    const handleReasonChange = (e) => {
      setReason(e.target.value);
    };
  
    const handleConfirmClick = () => {
      handleConfirm(reason);
    };
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cancelReason">
            <Form.Label>Reason for Cancellation</Form.Label>
            <Form.Control as="textarea" rows={4} value={reason} onChange={handleReasonChange} />
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
  