import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  Box
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../common/contexts/AuthContext';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, isAdmin, logout } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        {/* Logo Section */}
        <Box className="logo-section">
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate('/')}
            className="logo-button"
          >
            <ShoppingCart />
          </IconButton>
          <Typography variant="h6" className="brand-name">
            upGrad E-Shop
          </Typography>
        </Box>

        {/* Search Bar - Only show if logged in */}
        {isLoggedIn && (
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        )}

        {/* Navigation Links */}
        <Box className="nav-links">
          {isLoggedIn ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                className="nav-link"
              >
                Home
              </Button>
              {isAdmin && (
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/add-product"
                  className="nav-link"
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
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                className="nav-link"
              >
                LOGIN
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
                className="nav-link"
              >
                SIGN UP
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 