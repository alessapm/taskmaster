import axios from "axios";

const requestUrl = 'http://localhost:5000/tasks';

export const getTaskData = async () => {
    const response = await axios.get(requestUrl);
    return response.data
}

export const createTask = async (task) => {
    const response = await axios.post(requestUrl, task);
    return response;
}

export const updateTask = async (id, task) => {
    const response = await axios.put(`${requestUrl}/${id}`, task);
    return response.data;
}

export const deleteTask = async (id, task) => {
    const response = await axios.delete(`${requestUrl}/${id}`);
    return response;
}