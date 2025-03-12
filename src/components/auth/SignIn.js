import React, { useState } from 'react';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/contexts/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const token = response.headers.get('x-auth-token');
      const userData = await response.json();
      
      login(userData, token);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="sign-in-container">
      <Box className="sign-in-box">
        <Box className="lock-icon-container">
          <Lock className="lock-icon" />
        </Box>
        
        <Typography component="h1" variant="h5" className="sign-in-title">
          Sign in
        </Typography>

        <form onSubmit={handleSubmit} className="sign-in-form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            className="text-field"
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="text-field"
          />

          {error && (
            <Typography color="error" className="error-message">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="sign-in-button"
          >
            SIGN IN
          </Button>

          <Box className="sign-up-link">
            <Typography variant="body2">
              Don't have an account?{' '}
              <MuiLink component={Link} to="/signup" color="primary">
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Box>

      <Box className="footer">
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright © <MuiLink href="https://www.upgrad.com/" color="inherit">upGrad</MuiLink> 2021.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn; 