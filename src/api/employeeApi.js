import axios from "axios"

const API_URL = 'http://192.168.0.2:15930';

export const fetchEmployees = async () => {
    const response = await axios.get(`${API_URL}/employeelist`);
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await axios.post(`${API_URL}/createEmployee`, employeeData);
    return response.data;
}
