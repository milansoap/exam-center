import React from 'react';
import { Exam } from '../../models/Exam';
import { Button } from 'primereact/button';


interface ExamItemProps {
  exam: Exam;
}

export default function ExamItem({ exam }: ExamItemProps) {
    return (
        <div key={exam.id}>
          <p>Location: {exam.location}</p>
          <p>Field: {exam.field}</p>
          <Button label="Warning" className="p-button-warning" />
          {/* <p>Date and Time: {exam.dateAndTime}</p>
          <p>Canceled: {exam.cancelled}</p> */}
        </div>
      );
}
