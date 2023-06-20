import React, { useState, useEffect } from 'react';
import { Exam } from '../../models/Exam';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ApiService from '../../services/ApiService';
import { ExamItem } from './exams';
import { FilterOption } from '../../models/fetchMethod';


export default function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [filterOption, setFilterOption] = useState(FilterOption.All);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    filterExams();
  }, [filterOption]);

  const fetchExams = async () => {
    try {
      const fetchedExams: Exam[] = await ApiService.getExams();
      setExams(fetchedExams);
      setFilteredExams(fetchedExams);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  };

  const filterExams = () => {
    switch (filterOption) {
      case FilterOption.All:
        setFilteredExams(exams);
        break;
      case FilterOption.Cancelled:
        setFilteredExams(exams.filter((exam) => exam.cancelled == 1));
        break;
      case FilterOption.Past:
        setFilteredExams(exams.filter((exam) => new Date(exam.dateAndTime) < new Date()));
        break;
      default:
        setFilteredExams(exams);
        break;
    }
  };

  const handleFilterOptionChange = (option: FilterOption) => {
    setFilterOption(option);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Exams</h1>
        <hr />
        <Dropdown
          options={Object.values(FilterOption)}
          value={filterOption}
          onChange={(e) => handleFilterOptionChange(e.value as FilterOption)}
        />
      </div>
      <div className="examList">          
        {filteredExams.map((exam) => (
          <ExamItem key={exam.id} exam={exam} typeOfFilter={filterOption} />
        ))}
              </div>
    </div>
  );
}
