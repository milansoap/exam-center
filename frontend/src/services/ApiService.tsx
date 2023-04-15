import { Exam } from "../models/Exam";

const apiUrl = 'http://localhost:8080/api';

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

    
      

}

export default ApiService;