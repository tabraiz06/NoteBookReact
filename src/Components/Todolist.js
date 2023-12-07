import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
  };

  const saveTask = (index, updatedTask) => {
    if (updatedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
      setEditIndex(-1);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div>
        <textarea
          data-testid="task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          data-testid="btn"
          className="saveTodo"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="list">
            {editIndex === index ? (
              <>
                <textarea
                  className="editTask"
                  value={task}
                  onChange={(e) => {
                    const updatedTask = e.target.value;
                    const updatedTasks = [...tasks];
                    updatedTasks[index] = updatedTask;
                    setTasks(updatedTasks);
                  }}
                />
                <button
                  className="saveTask"
                  onClick={() => saveTask(index, task)}
                >
                  Save
                </button>
              </>
            ) : (
              task
            )}
            <button className="edit" onClick={() => editTask(index)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
