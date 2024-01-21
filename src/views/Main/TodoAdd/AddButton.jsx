import React, { useState } from 'react';
import './AddButton.css';

export const AddButton = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (!inputValue) return;
    onAdd(inputValue);
    setInputValue('');
  };
	const pullUpContent = () => {
    var pullUpContainer = document.getElementById('pullUpContainer');
    pullUpContainer.style.display = pullUpContainer.style.display === 'none' ? 'block' : 'none';
  };
  const pullUpType = () => {
    var TypeContainer = document.getElementById('TypeContainer');
    TypeContainer.style.display = TypeContainer.style.display === 'none' ? 'block' : 'none';
  };

  return (
    <div>
      <div id="pullUpContainer">
        <button id="mask" onClick={pullUpContent}></button>
        <div id="TypeContainer">
          <div id="Types">
          <button className="Type1"></button>
          <button className="Type2"></button>
          <button className="Type3"></button>
          <button className="Type4"></button>
          <button className="Type5"></button>
          <button className="Type6"></button>
          </div>
        </div>
        <div id="ContentContainer">
          <div id="Content">
          <button className="Type" onClick={pullUpType}></button>
          <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter a new todo..."/>
          </div>
          <button id="Add" onClick={handleAddClick}></button>
          </div>
        </div>
        <div id="KeyBoard">
          <h1>KeyBoard</h1>
        </div>
      </div>
      <button id="iconTodoAdd" onClick={pullUpContent}></button>
    </div>
  );
}
