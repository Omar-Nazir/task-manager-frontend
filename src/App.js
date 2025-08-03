
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_URL || 5000;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await axios.post(API, { title});
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggleTask = async (id, completed) => {
    const res = await axios.put(`${API}/${id}`, { completed: !completed });
    setTasks(tasks.map(task => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Task Manager</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.taskList}>
        {tasks.map(task => (
          <li key={task._id} style={styles.taskItem}>
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#999' : '#333'
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 14px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  taskText: {
    fontSize: '16px',
    cursor: 'pointer',
  },
  deleteButton: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
