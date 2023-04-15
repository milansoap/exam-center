import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Exam } from '../../models/Exam';
import { ExamItem } from './exams';
export default function ExamList() {

  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await ApiService.getExams();
      setExams(data);
    }
    fetchData();
  }, []);

  console.log(exams)

  return (
    <div>
      working
      {exams.map((exam) => (
        <ExamItem key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
