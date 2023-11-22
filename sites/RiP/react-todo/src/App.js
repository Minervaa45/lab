import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Получение задач с сервера
  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      // Отправка новой задачи на сервер
      axios.post('http://localhost:3001/tasks', { text: taskInput })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error adding task:', error));
      setTaskInput('');
    }
  };

  const removeTask = (taskId) => {
    // Удаление задачи с сервера
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
