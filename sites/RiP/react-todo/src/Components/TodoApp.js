// TodoApp.js
import React, { useState } from 'react';

const TodoApp = ({ tasks, onAddTask, onRemoveTask }) => {
  const [newTask, setNewTask] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask); // Вызывается ли здесь функция onAddTask?
    setNewTask('');
  };

  return (
    <div>
      {/* Вывод задач */}
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.text}</span>
          <button onClick={() => onRemoveTask(task.id)}>Удалить</button>
        </div>
      ))}

      {/* Форма для добавления новой задачи */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить задачу</button>
      </form>
    </div>
  );
};

export default TodoApp;
