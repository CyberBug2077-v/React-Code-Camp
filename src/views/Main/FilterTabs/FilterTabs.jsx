import React from 'react';
import './FilterTabs.css';

export const FilterTabs = () => {
  return (
    <div className="filter-tabs">
      <div>
        <button>All</button>
        <button>Important</button>
      </div>
      <button>Types</button>
    </div>
  );
}

