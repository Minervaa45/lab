import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Компонент для чата
function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/chat/messages/')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Ошибка загрузки сообщений:', error));
  }, []);

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      axios.post('http://localhost:8000/api/chat/messages/', { author: 'AuthorName', content: newMessage })
        .then(response => setMessages([...messages, response.data]))
        .catch(error => console.error('Ошибка отправки сообщения:', error));
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.author}</strong>: {msg.content}
          <br />
          <small>{new Date(msg.timestamp).toLocaleString()}</small>
        </div>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={addMessage}>Отправить</button>
    </div>
  );
}

// Компонент для ToDo
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/todo/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Ошибка загрузки задач:', error));
  }, []);

  const addTask = () => {
    if (newTaskName.trim() !== '') {
      axios.post('http://127.0.0.1:8000/api/todo/', { name: newTaskName, description: newTaskDescription })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Ошибка добавления задачи:', error));
      setNewTaskName('');
      setNewTaskDescription('');
    }
  };

  return (
    <div>
      <h2>ToDo</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <strong>{task.name}</strong>: {task.description}
        </div>
      ))}
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Название задачи"
      />
      <textarea
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="Описание задачи"
      />
      <button onClick={addTask}>Добавить задачу</button>
    </div>
  );
}

// Основной компонент приложения
function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/chat">Чат</Link>
          <Link to="/todo">ToDo</Link>
        </nav>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
