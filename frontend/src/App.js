import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import { getTaskData, createTask } from "./taskService";


export default function App() {
  const [ tasks, setTasks ] = useState([]);
  const [ newTask, setNewTask ] = useState({title: '', description: '', completed: false});
  
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await getTaskData();
        setTasks(tasksData);
        console.log('tasks: ', tasks)
      } catch (err) {
        console.log('error fetching data: ', err);
      }
    }
    getTasks();
   
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(newTask);
      const updatedTasks = await getTaskData();
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '', completed: false });
    } catch (err) {
      console.log('error creating task: ', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Task Master
        </h1>
      </header>
      <div className="main">
        <div className="add-new">
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newTask.description}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Completed:
              <input
                type="checkbox"
                name="completed"
                checked={newTask.completed}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="task-container">
        Tasks: 
        {!tasks ? <p>No Current Tasks</p> 
        : (
          <ul>
            {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
          </li>
        ))}
          </ul>
        )
        }
        </div>
      </div>
    </div>
  );
}
