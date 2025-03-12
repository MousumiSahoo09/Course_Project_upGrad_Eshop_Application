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
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.emailAddress,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactNumber: formData.contactNumber
        })
      });

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="signup-container">
      <Box className="signup-box">
        <Box className="lock-icon-wrapper">
          <Lock className="lock-icon" />
        </Box>
        
        <Typography component="h1" variant="h5" className="signup-title">
          Sign up
        </Typography>

        <form onSubmit={handleSubmit} className="signup-form">
          <TextField
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="emailAddress"
            label="Email Address"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="contactNumber"
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="form-field"
            InputLabelProps={{
              shrink: true,
              className: "field-label"
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="signup-button"
          >
            SIGN UP
          </Button>

          <Box className="signin-link">
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" className="link">
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp; 