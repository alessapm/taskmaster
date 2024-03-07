import axios from "axios";

const requestUrl = 'http://localhost:5000/tasks';

export const getTaskData = async () => {
    const response = await axios.get(requestUrl);
    console.log('data: ', response.data);
}