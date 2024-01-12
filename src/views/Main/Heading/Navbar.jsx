import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-menu">Menu</div>
      <h1>My Todo List</h1>
      <div className="navbar-search">Search</div>
    </nav>
  );
}

