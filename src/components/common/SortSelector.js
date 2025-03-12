import React from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel,
  Box,
  Typography 
} from '@material-ui/core';
import './SortSelector.css';

const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <Box className="sort-container">
      <Typography component="span" className="sort-label">
        Sort By:
      </Typography>
      <FormControl variant="outlined" className="sort-form-control">
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          displayEmpty
          className="sort-select"
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelector; 