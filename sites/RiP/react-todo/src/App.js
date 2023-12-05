import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const LabeledInput = ({ type, value, onChange, placeholder }) => (
  <>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    <br />
  </>
);

const ItemList = ({ items, renderItem }) => (
  <>
    {items.map((item) => (
      <div key={item.id}>
        {renderItem(item)}
      </div>
    ))}
  </>
);


function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new W3CWebSocket('ws://127.0.0.1:8000/ws');

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (!messages.some((msg) => msg.id === data.id)) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    newClient.onclose = (event) => {
      console.error('WebSocket Closed: ', event);
    };

    newClient.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    setClient(newClient); // Сохраняем client в состоянии

    return () => {
      newClient.close();
    };
  }, []);

  const addMessage = (event) => {
    event.preventDefault();

    if (newMessage.trim() !== '' && authorName.trim() !== '' && client) {
      const messageData = {
        type: 'websocket.receive',
        author: authorName,
        text: newMessage,
      };

      client.send(JSON.stringify(messageData));

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { author: authorName, content: newMessage, timestamp: new Date().toISOString() },
      // ]);

      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <LabeledInput
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Имя автора"
      />
      <ItemList
        items={messages}
        renderItem={(msg) => (
          <div key={msg.id}>
            <strong>{msg.author}</strong>: {msg.content}
            <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
        </div>
        )}
      />
      <LabeledInput
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={addMessage}>Отправить</button>
    </div>
  );
}

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
      axios.post('http://127.0.0.1:8000/api/todo/', {
        name: newTaskName,
        description: newTaskDescription,
      })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Ошибка добавления задачи:', error));
      setNewTaskName('');
      setNewTaskDescription('');
    }
  };

  return (
    <div>
      <h2>ToDo</h2>
      <ItemList items={tasks} renderItem={(task) => (
        <>
          <strong>{task.name}</strong>: {task.description}
        </>
      )} />
      <LabeledInput
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
