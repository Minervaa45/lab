// TodoApp.js
import React, { useState } from 'react';

const TodoApp = ({ tasks, onAddTask, onRemoveTask }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  const removeTask = (taskId) => {
    onRemoveTask(taskId);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
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
};

export default TodoApp;
