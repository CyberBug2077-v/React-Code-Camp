import React, { useState } from 'react';
import {Navbar} from './Heading/Navbar';
import {FilterTabs} from './FilterTabs/FilterTabs';
import {TodoList} from './Scroll/TodoList';
import {AddButton} from './TodoAdd/AddButton';


export const Main = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todoText) => {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      isCompleted: false,
      isImportant: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleImportant = (id) => {
    setTodos(
      todos.map((todo) =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
      )
    );
  };

  return (
  <div className="container-md">
  <Navbar />
  <FilterTabs />
  <TodoList
  todos={todos}
  onComplete={handleComplete}
  onDelete={handleDelete}
  onToggleImportant={handleImportant}
  />
  <AddButton onAdd={handleAddTodo} />
  </div>
  );
}
