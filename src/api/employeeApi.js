import axios from "axios"

const API_URL = 'http://192.168.0.2:15930';


export const fetchEmployeesAPI = async () => {
    const response = await axios.get(`${API_URL}/employeelist`);
    return response.data;
};


export const createEmployeeAPI = async (employeeData) => {
    const response = await axios.post(`${API_URL}/createEmployee`, employeeData);
    return response.data;
};


export const updateEmployeeAPI = async (employee) => {
    if (!employee.employee_id) {
        console.log("Missing employee_id in updateEmployeeAPI");
    }
    const response = await axios.put(`${API_URL}/updatedEmployee/${employee.employee_id}`, employee);
    return response.data;
};


export const deleteEmployeeAPI = async (employee) => {
    const response = await axios.delete(`${API_URL}/delete_employee/${employee.employee_id}`);
    return response.data;
};


// export const fetchEmployeeByIdAPI = async (id) => {
//     const response = await axios.get(`${API_URL}/employeelist/${id}`);    // Ensure this endpoint exists in your backend
//     return response.data;
// }