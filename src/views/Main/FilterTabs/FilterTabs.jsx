import React from 'react';
import './FilterTabs.css';

export const FilterTabs = () => {
  return (
    <div className="filter-tabs">
      <div className="filter">
        <button>All</button>
        <button>Important</button>
      </div>
      <div className="types">
        <button>Types</button>
      </div>
    </div>
  );
}

