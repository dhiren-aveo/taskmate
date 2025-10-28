import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
    if (todos.length === 0) {
        return <p className="no-todos">No tasks yet — add your first one! ✨</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}
