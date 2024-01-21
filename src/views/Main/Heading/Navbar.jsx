import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <button className ="iconSetting"></button>
      <h1>My Todo List</h1>
      <button className ="iconProfile"></button>
    </nav>
  );
}

