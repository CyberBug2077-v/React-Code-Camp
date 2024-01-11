import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import AddButton from './components/AddButton';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // 添加新待办事项
  const handleAddTodo = (todoText) => {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      isCompleted: false,
      isImportant: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 完成待办事项
  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // 删除待办事项
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 切换待办事项的重要性
  const handleImportant = (id) => {
    setTodos(
      todos.map((todo) =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
      )
    );
  };

  return (
  <div className="App">
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

export default App;
