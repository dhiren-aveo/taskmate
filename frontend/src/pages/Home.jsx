// src/pages/Home.jsx
import React, { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ConnectGoogle from "../components/ConnectGoogle";

function Home() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task, dueDate) => {
    const newTodo = {
      id: Date.now(),
      task,
      dueDate, // ⏰ User-selected date/time
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1 className="title">Todo App 📝</h1>
      <ConnectGoogle/>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Home;
