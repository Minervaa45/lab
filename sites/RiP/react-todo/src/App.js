// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Chat from './Components/Chat';
import TodoApp from './Components/TodoApp';

function App() {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/chat/')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Ошибка сообщения:', error));

    axios.get('http://localhost:8000/api/todo/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Ошибка таска:', error));
  }, []);

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      axios.post('http://localhost:8000/api/chat/', { text: newMessage })
        .then(response => setMessages([...messages, response.data]))
        .catch(error => console.error('Ошибка отправки сообщения:', error));
      setNewMessage('');
    }
  };

  const addTask = (taskText) => {
    if (taskText.trim() !== '') {
      axios.post('http://localhost:8000/api/todo/', { text: taskText })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Ошибка добавления таска:', error));
    }
  };

  const removeTask = (taskId) => {
    axios.delete(`http://localhost:8000/api/todo/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Ошибка удаления таска:', error));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <Chat messages={messages} onSendMessage={addMessage} />
      <TodoApp tasks={tasks} onAddTask={addTask} onRemoveTask={removeTask} />
    </div>
  );
}

export default App;
