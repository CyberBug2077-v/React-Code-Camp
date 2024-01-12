import React from 'react';
import {TodoItem} from './TodoItem';
import './TodoList.css';

export const TodoList = ({ todos, onComplete, onDelete, onToggleImportant }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </ul>
  );
}
