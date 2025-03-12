import React from 'react';
import { 
  ToggleButton, 
  ToggleButtonGroup 
} from '@material-ui/lab';
import { Box } from '@material-ui/core';
import './CategoryToggle.css';

const CategoryToggle = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleChange = (event, newCategory) => {
    if (newCategory !== null) {
      onCategoryChange(newCategory);
    }
  };

  return (
    <Box className="category-toggle-container">
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={handleChange}
        aria-label="product categories"
        className="category-toggle-group"
      >
        <ToggleButton 
          value="ALL" 
          aria-label="all products"
          className="category-toggle-button"
        >
          ALL
        </ToggleButton>
        {categories.map((category) => (
          <ToggleButton
            key={category}
            value={category}
            aria-label={category.toLowerCase()}
            className="category-toggle-button"
          >
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default CategoryToggle; 