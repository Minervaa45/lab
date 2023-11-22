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
    axios.get('http://localhost:3001/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));

    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      axios.post('http://localhost:3001/messages', { text: newMessage })
        .then(response => setMessages([...messages, response.data]))
        .catch(error => console.error('Error sending message:', error));
      setNewMessage('');
    }
  };

  const addTask = (taskText) => {
    if (taskText.trim() !== '') {
      axios.post('http://localhost:3001/tasks', { text: taskText })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const removeTask = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Todo App with Chat</h1>
      <Chat messages={messages} onSendMessage={addMessage} />
      <TodoApp tasks={tasks} onAddTask={addTask} onRemoveTask={removeTask} />
    </div>
  );
}

export default App;
