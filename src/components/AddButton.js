import React, { useState } from 'react';
import './AddButton.css';

function AddButton({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (!inputValue) return;
    onAdd(inputValue);
    setInputValue(''); // 清空输入框
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new todo..."
      />
      <button className="add-button" onClick={handleAddClick}>
        Add Todo
      </button>
    </div>
  );
}

export default AddButton;
