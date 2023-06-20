// ExamDetails.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Exam } from '../../models/Exam';
import ApiService from '../../services/ApiService';
import { Examinee } from '../../models/Examinee';
import ExamineeItem from './ExamineeItem';
import { Button } from 'react-bootstrap';
import CustomAddExamineeModal from '../shared/CustomAddExamineeModal';

function ExamDetails() {

  const [exam, setExam] = useState<Exam>();
  const [examinees, setExaminees] = useState<Examinee[]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { id } = useParams();
  const examId = parseInt(id);
  const examIdString: string = id;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addExamineeToExam = async (selectedExamineeId: string) => {
    try {
      const newExaminee = await ApiService.addExamExaminee(examIdString, selectedExamineeId);
      setExaminees(prevExaminees => [...prevExaminees, newExaminee]);
    } catch (error) {
      console.error('Failed to add examinee:', error);
    } finally {
      closeModal();
    }
  };
  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const examData = await ApiService.getExamById(examId);
        const examineesData = await ApiService.getExamineesByExam(examId);
        setExam(examData);
        setExaminees(examineesData);
      } catch (error) {
        console.error('Failed to fetch exam details:', error);
      }
    };

    fetchData();
  }, [examId, examinees]);

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="header">
          <h1>{exam.field}</h1>
          <h3> {exam.location} </h3>
          <hr />
        </div>

        <div className="containerCustom">
          {examinees.length > 0 ? (
            examinees.map((examinee) => (
              <ExamineeItem key={examinee.id} examinee={examinee} />
            ))
          ) : (
            <p>No examinees on this exam.</p>
          )}
        </div>

        <Button onClick={openModal} className="p-button p-button-info p-button-rounded w-100" style={{ fontSize: '18px', padding: '12px 14px', margin: '20px' }}>Add Examinee</Button>
  
              {isModalOpen && (
                <CustomAddExamineeModal
                  show={isModalOpen}
                  handleClose={closeModal}
                  handleConfirm={addExamineeToExam}
                  title="Cancel Exam"
                  examId={exam.id}
                />
              )}


      </div>
    </div>
  );
}
export default ExamDetails;