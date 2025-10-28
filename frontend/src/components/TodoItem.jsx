// src/components/TodoItem.jsx
import React from "react";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const formattedDate = new Date(todo.dueDate).toLocaleString();

  return (
    <li className="todo-item">
      <div className="todo-content">
        <span
          onClick={() => toggleTodo(todo.id)}
          className={todo.completed ? "completed" : ""}
        >
          {todo.task}
        </span>
        <small className="todo-date">📅 {formattedDate}</small>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
