import React from 'react';
import './TodoItem.css';

export const TodoItem = ({ id, text, isCompleted, isImportant, onComplete, onDelete, onToggleImportant }) => {
  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''} ${isImportant ? 'important' : ''}`}>
      <span onClick={() => onComplete(id)}>{text}</span>
      <button onClick={() => onToggleImportant(id)}>Important</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
