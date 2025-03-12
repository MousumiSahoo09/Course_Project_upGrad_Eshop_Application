import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useCategory } from '../../common/contexts/CategoryContext';
import './CategoryTabs.css';

const CategoryTabs = ({ categories }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <Box className="category-tabs">
      <Button
        className={`category-tab ${selectedCategory === 'ALL' ? 'selected' : ''}`}
        onClick={() => setSelectedCategory('ALL')}
      >
        ALL
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          className={`category-tab ${selectedCategory === category ? 'selected' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.toUpperCase()}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryTabs; 