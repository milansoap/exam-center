import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { Form, Button, Table } from "react-bootstrap";
import ExamineeItem from "./ExamineeItem";

export default function Examinees() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [adress, setadress] = useState("");
  const [examinees, setExaminees] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const person = { firstName, lastName, dateOfBirth, adress };
    ApiService.addExaminee(person)
      .then(() => {
        setfirstName("");
        setLastName("");
        setdateOfBirth("");
        setadress("");
        setNeedsUpdate(true);
      })
      .catch((error) => {
        console.error("Failed to add examinee:", error);
      });
  }

  useEffect(() => {
    async function fetchExaminees() {
      try {
        const data = await ApiService.getExaminees();
        setExaminees(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExaminees();
  }, [needsUpdate]);

  function handleDelete(id: number) {
    setNeedsUpdate(false);
    ApiService.deleteExaminee(id)
      .then(() => {
        setNeedsUpdate(true);
      })
      .catch((error) => {
        console.error("Failed to delete examinee:", error);
      });
  }

  return (
    <><div className="container">
    <div className="header">
      <h1>Add Examinee</h1>
      <hr />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label htmlFor="location">First Name</label>
        <input type="text" className="form-control form-control-lg" id="location" placeholder="Enter location" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="field">Last Name</label>
        <input type="text" className="form-control form-control-lg" id="field" placeholder="Enter field" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="dateAndTime">Date Of Birth</label>
        <input type="datetime-local" className="form-control form-control-lg" id="dateAndTime" value={dateOfBirth} onChange={(e) => setdateOfBirth(e.target.value)} />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="dateAndTime">Adress</label>
        <input type="text" className="form-control form-control-lg" id="dateAndTime" value={adress} onChange={(e) => setadress(e.target.value)} />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg">Add Examinee</button>
      </div>
    </form>
  </div>
  <div className="containerCustom">

      {examinees.map((examinee) => (
                  <ExamineeItem key={examinee.id} examinee={examinee}/>
      ))}
      </div>
  </>  
);
}

