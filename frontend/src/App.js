import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import { getTaskData } from "./taskService";


export default function App() {
  const [ tasks, setTasks ] = useState([]);
  
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await getTaskData();
        setTasks(tasksData);
      } catch (err) {
        console.log('error fetching data: ', err);
      }
    }
    getTasks();
    console.log('tasks: ', tasks)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Task Master
        </h1>
      </header>
      <div className="main">
        Tasks: 
        {!tasks ? <p>No Current Tasks</p> 
        : tasks.map((task) => (
          <li key={task.id}>
            {task.title}
          </li>
        ))
        }
      </div>
    </div>
  );
}
