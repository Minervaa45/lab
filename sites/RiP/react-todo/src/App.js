import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput }]);
      setTaskInput('');
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
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
