import React from 'react';
import { InputBase, IconButton, Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Box className="search-section">
      <form onSubmit={handleSubmit}>
        <Box className="search-container">
          <Search className="search-icon" />
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            fullWidth
          />
        </Box>
      </form>
    </Box>
  );
};

export default SearchBar; 