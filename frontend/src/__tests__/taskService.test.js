import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { getTaskData, createTask, updateTask } from '../taskService';

// const mock = new MockAdapter(axios);
const requestUrl = 'http://localhost:5000/tasks';

jest.mock('axios');

describe('taskService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetches tasks successfully', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
    mock.onGet(requestUrl).reply(200, mockTasks);

    const result = await getTaskData();
    expect(result).toEqual(mockTasks);
  });

  it('handles fetch tasks failure', async () => {
    mock.onGet(requestUrl).reply(500, 'Internal Server Error');

    await expect(getTaskData()).rejects.toThrow('Request failed with status code 500');
  });

  it('creates a task successfully', async () => {
    const task = { title: 'New Task' };
    mock.onPost(requestUrl, task).reply(201, { message: 'Task successfully created' });

    const result = await createTask(task);
    expect(result).toHaveProperty('message', 'Task successfully created');
  });


  it('updates a task successfully', async () => {
    const taskId = 1;
    const task = { title: 'Updated Task' };
    mock.onPut(`${requestUrl}/${taskId}`, task).reply(200, { message: 'Task successfully updated' });

    const result = await updateTask(taskId, task);
    expect(result).toHaveProperty('message', 'Task successfully updated');
  });

});