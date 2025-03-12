import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase,
  Button,
  Box 
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../common/contexts/SearchContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <Box className="left-section">
          <Typography 
            variant="h6" 
            className="logo"
            onClick={() => navigate('/')}
          >
            <span className="shopping-cart">🛒</span> upGrad E-Shop
          </Typography>
          
          <Box className="search-box">
            <SearchIcon className="search-icon" />
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </Box>
        </Box>

        <Box className="nav-buttons">
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            className="nav-button"
          >
            Home
          </Button>

          {isAdmin && (
            <Button
              color="inherit"
              onClick={handleAddProduct}
              className="nav-button add-product-button"
            >
              Add Product
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className="logout-button"
          >
            LOGOUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 