import { Exam } from "../models/Exam";
import { ExamCancellation } from "../models/ExamCancellation";
import { Examinee } from "../models/Examinee";

const apiUrl = 'http://localhost:9090/api';

const ApiService = {

  async getExams(): Promise<Exam[]> {
    const response = await fetch(apiUrl + '/exams')
    const data = await response.json();
    return data;
  },

  async getExamById(id: number): Promise<Exam> {
    const response = await fetch(apiUrl + '/exams/' + id)
    const data = await response.json()
    return data
  },

  async deleteExam(id: number): Promise<void> {
    const response = await fetch(apiUrl + '/exams/' + id, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Failed to delete exam with ID ${id}`);
    }
  },

  async addExaminee(examinee: any) {
    console.log(JSON.stringify(examinee))
    const response = await fetch(apiUrl + '/examinees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(examinee)
    });
    if (!response.ok) {
      console.log(examinee)
      throw new Error('Failed to add examinee.');

    }
    return await response.json();
  },

  async getExaminees(): Promise<Exam[]> {
    const response = await fetch(apiUrl + '/examinees');
    const data = await response.json();
    return data;
  },

  async deleteExaminee(id: number): Promise<void> {
    const response = await fetch(apiUrl + '/examinees/' + id, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Failed to delete examinee with ID ${id}`);
    }
  },
  async addExam(exam: any): Promise<Exam> {
    const response = await fetch(apiUrl + '/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exam)
    });
    if (!response.ok) {
      throw new Error('Failed to add exam.');
    }
    return await response.json();
  },

  async updateExam(exam: any): Promise<Exam> {
    const response = await fetch(apiUrl + '/exams/' + exam.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exam)
    });
    if (!response.ok) {
      throw new Error(`Failed to update exam with ID ${exam.id}`);
    }
    return await response.json();
  },



  async cancelExam(examCancellation: ExamCancellation): Promise<ExamCancellation> {
    console.log(examCancellation)
    const response = await fetch(apiUrl + '/cancellations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examCancellation)
    });
    if (!response.ok) {
      throw new Error(`Failed to update exam with ID ${examCancellation}`);
    }
    return await response.json();
  },

  async findByExamineeId(examineeId) {
    try {
      const response = await fetch(`/examinee/${examineeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getExamineesByExam(examId) {
    try {
      const response = await fetch(apiUrl +`/examexaminee/examinees/${examId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async addExamExaminee(examId: string, userId: string): Promise<Examinee> {
    const response = await fetch(apiUrl + `/examexaminee/${examId}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to add examexaminee.');
    }
    return await response.json();
  },




};


export default ApiService;