import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ApiService from '../../services/ApiService';

const CustomModal = ({ show, handleClose, handleConfirm, title, examId }) => {
    const [selectedExaminee, setSelectedExaminee] = useState('');
    const [examinees, setExaminees] = useState([]);

    const fetchExaminees = async () => {
        const examinees = await ApiService.getExaminees();
        console.log(examinees)
        return examinees;
      };
  
   
      const handleExamineeChange = (e) => {
        setSelectedExaminee(e.target.value);
        console.log(e.target.value)
      };
  

    useEffect(() => {
        const loadExaminees = async () => {
          const examinees = await fetchExaminees();
          // Update the state with the fetched examinees
          setExaminees(examinees);
        };
    
        loadExaminees();
      }, []);


      const handleConfirmClick = () => {
        handleConfirm(selectedExaminee);
      };
      
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="examineeSelect">
          <Form.Label>Select Examinee</Form.Label>
          <Form.Control as="select" value={selectedExaminee} onChange={handleExamineeChange}>
            <option value="">-- Select Examinee --</option>
            {examinees.map((examinee) => (
              <option key={examinee.id} value={examinee.id}>
                {examinee.firstName} {examinee.lastName}
              </option>
            ))}
          </Form.Control>
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
  