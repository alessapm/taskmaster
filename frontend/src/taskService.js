import axios from "axios";

const requestUrl = 'http://localhost:5000/tasks';

export const getTaskData = async () => {
    const response = await axios.get(requestUrl);
    return response.data
}

export const createTask = async (task) => {
    const response = await axios.post(requestUrl, task);
    console.log('post response: ', response);
    return response;
}

export const updateTask = async (id, task) => {
    console.log('update task: ', task);

    const response = await axios.put(`${requestUrl}/${id}`, task);
    console.log('put response: ', response);
    return response.data;
}