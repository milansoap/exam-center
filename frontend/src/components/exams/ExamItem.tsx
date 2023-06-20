import React, { useState } from 'react';
import { Exam } from '../../models/Exam';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { ModalDialog } from 'react-bootstrap';
import CustomModal from '../shared/CustomModal';
import { ExamCancellation } from '../../models/ExamCancellation';
import { FilterOption } from '../../models/fetchMethod';
import { type } from 'os';
import { faEye, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomEditModal from '../shared/CustomEditModal';


interface ExamItemProps {
  exam: Exam;
  typeOfFilter: FilterOption
}


export default function ExamItem({ exam, typeOfFilter }: ExamItemProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setisEditModalOpen(true);
  };

  const closeEditModal = () => {
    setisEditModalOpen(false);
  };

  const navigate = useNavigate();

  function handleSeeMore(examId) {
    navigate(`/exams/${examId}`);
  }


  const handleEditExam = async (updatedExam) => {
    console.log(updatedExam);
  
    try {
      await ApiService.updateExam(updatedExam);
      console.log('Exam edited successfully:', updatedExam);
      closeModal();
    } catch (error) {
      console.error('Failed to edit exam:', error);
      // Handle error condition
    }
    closeEditModal()
  };
  

  const handleCancelExam = async (cancelReason) => {
    const cancellation: ExamCancellation = {
      examId: exam.id,
      reason: cancelReason,
    };

    console.log(cancellation)

    try {
      await ApiService.cancelExam(cancellation);
      console.log('Exam canceled with reason:', cancelReason);
      closeModal();
    } catch (error) {
      console.error('Failed to cancel exam:', error);
      // Handle error condition
    }
  };

  if (typeOfFilter === FilterOption.All) {
    return (
      <div className="outlayItem">
        <div className="insideItem">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left-content">
              <h3 className="m-1">{exam.field}</h3>
              <p className="mb-1">{exam.location}</p>
              <small>{exam.dateAndTime.toString()}</small>
            </div>
            <div className="right-content">
              <Button className="p-button p-button-warning p-button-rounded" onClick={() => handleSeeMore(exam.id)} style={{ fontSize: '18px', padding: '15px 28px', borderRadius: '50px' }}>
                <FontAwesomeIcon icon={faEye} size="2x" />
              </Button>
              <Button onClick={openEditModal} className="p-button p-button-success p-button-rounded" style={{ fontSize: '18px', padding: '15px 28px', borderRadius: '50px' }}>
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </Button>
              <Button onClick={openModal} className="p-button p-button-danger p-button-rounded" style={{ fontSize: '18px', padding: '15px 28px', borderRadius: '50px' }}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </Button>
          

              {isEditModalOpen && (
                <CustomEditModal
                  show={isEditModalOpen}
                  handleClose={closeEditModal}
                  handleConfirm={handleEditExam}
                  exam={exam}
                />
              )}
            </div>

              {isModalOpen && (
                <CustomModal
                  show={isModalOpen}
                  handleClose={closeModal}
                  handleConfirm={handleCancelExam}
                  title="Cancel Exam"
                  examId={exam.id}
                />
              )}
            </div>

          </div>
        </div>
    );
  }
  else if (typeOfFilter === FilterOption.Cancelled) {
    return (
      <div className="outlayItem">
        <div className="insideItem">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left-content">
              <h3 className="m-1">{exam.field}</h3>
              <p className="mb-1">{exam.location}</p>
              <p className="mt-2 mb-2">CANCELLED</p>
              <small>{exam.dateAndTime.toString()}</small>
            </div>
            <div className="right-content">
              <Button label="See More" className="p-button p-button-warning p-button-rounded" onClick={() => handleSeeMore(exam.id)} style={{ fontSize: '18px', padding: '12px 24px' }} />
            </div>

          </div>
        </div>
      </div>
    );
  }

  else if (typeOfFilter === FilterOption.Past) {
    return (
      <div className="outlayItem">
        <div className="insideItem">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left-content">
              <h3 className="m-1">{exam.field}</h3>
              <p className="mb-1">{exam.location}</p>
              <p className="mt-2 mb-2">PAST</p>
              <small>{exam.dateAndTime.toString()}</small>
            </div>
            <div className="right-content">
              <Button label="See More" className="p-button p-button-warning p-button-rounded" onClick={() => handleSeeMore(exam.id)} style={{ fontSize: '18px', padding: '12px 24px' }} />
            </div>

          </div>
        </div>
      </div>
    );
  }

}
