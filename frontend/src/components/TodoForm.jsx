// src/components/TodoInput.jsx
import React, { useState } from "react";

function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !dueDate) return;

    addTodo(task, dueDate);
    setTask("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        className="todo-input"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        type="datetime-local"
        className="todo-datetime"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}

export default TodoInput;
