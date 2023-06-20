import React, { useState } from 'react';
import ApiService from '../../services/ApiService'; 

function AddExam() {
  const [location, setLocation] = useState('');
  const [field, setField] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const apiService = ApiService;

  const handleAddExam = async (e) => {
    e.preventDefault();

    try {
      const exam = {
        location,
        field,
        dateAndTime
      };

      const addedExam = await apiService.addExam(exam);
      console.log('Exam added:', addedExam);

      setLocation('');
      setField('');
      setDateAndTime('');
    } catch (error) {
      console.error('Failed to add exam:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Add Exam</h1>
        <hr />
      </div>
      <form onSubmit={handleAddExam}>
        <div className="form-group mb-4">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control form-control-lg" id="location" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="field">Field</label>
          <input type="text" className="form-control form-control-lg" id="field" placeholder="Enter field" value={field} onChange={(e) => setField(e.target.value)} />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="dateAndTime">Date and Time</label>
          <input type="datetime-local" className="form-control form-control-lg" id="dateAndTime" value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg">Add Exam</button>
        </div>
      </form>
    </div>
  );
}

export default AddExam;
