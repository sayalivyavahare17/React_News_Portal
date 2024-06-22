// src/components/CategoryFilter.js

import React from 'react';
import '../styles/CategoryFilter.css';

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="category-filter">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
