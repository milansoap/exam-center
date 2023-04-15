import { Exam } from "../models/Exam";

const apiUrl = 'http://localhost:8080/api';

const ApiService = {

    async getExams(): Promise<Exam[]> {
        const response = await fetch(apiUrl + '/exams')
        const data = await response.json();
        return data;
    }

}

export default ApiService;