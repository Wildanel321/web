import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (taskInput.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
        setTaskInput('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEdit = (id, text) => {
        setEditTaskId(id);
        setEditTaskText(text);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        if (editTaskText.trim() === '') return;
        setTasks(tasks.map(task =>
            task.id === editTaskId ? { ...task, text: editTaskText } : task
        ));
        setEditTaskId(null);
        setEditTaskText('');
    };

    const cancelEdit = () => {
        setEditTaskId(null);
        setEditTaskText('');
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Work Management</h1>
            
            <div className="task-form-container">
                <form onSubmit={addTask} className="task-form">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Add new task"
                        className="task-input"
                    />
                    <button
                        type="submit"
                        className="add-button"
                    >
                        Add
                    </button>
                </form>
            </div>

            <div className="task-list-container">
                {tasks.length === 0 ? (
                    <p className="no-tasks">No tasks yet</p>
                ) : (
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li
                                key={task.id}
                                className="task-item"
                            >
                                {editTaskId === task.id ? (
                                    <form onSubmit={saveEdit} className="edit-form">
                                        <input
                                            type="text"
                                            value={editTaskText}
                                            onChange={(e) => setEditTaskText(e.target.value)}
                                            className="edit-input"
                                        />
                                        <button
                                            type="submit"
                                            className="save-button"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <div className="task-content">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTask(task.id)}
                                            className="task-checkbox"
                                        />
                                        <span className={task.completed ? 'task-text completed' : 'task-text'}>
                                            {task.text}
                                        </span>
                                        <button
                                            onClick={() => startEdit(task.id, task.text)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;