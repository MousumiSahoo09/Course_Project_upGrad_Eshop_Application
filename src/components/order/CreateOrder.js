import React, { useState, useEffect } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  Grid
} from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateOrder.css';
import CloseIcon from '@material-ui/icons/Close';

const steps = ['Product Details', 'Address', 'Confirm Order'];

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity } = location.state || {};
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipCode: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    setAddressError('');
  };

  const handleNewAddressChange = (event) => {
    const { name, value } = event.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveNewAddress = async () => {
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newAddress)
      });
      
      if (response.ok) {
        const savedAddress = await response.json();
        setAddresses(prev => [...prev, savedAddress]);
        setSelectedAddress(savedAddress.id);
        setShowAddressForm(false);
        setAddressError('');
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      setSnackbarOpen(true);
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        quantity: quantity,
        productId: product.id,
        addressId: selectedAddress
      };

      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Navigate to products page with success message
        navigate('/', { 
          state: { showSuccessMessage: true }
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setSnackbarOpen(true);
    }
  };

  const ProductDetailsStep = () => (
    <Card className="order-details-card">
      <CardContent>
        <Box className="product-summary">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          <Box className="product-info">
            <Typography variant="h5" component="h2">
              {product.name}
            </Typography>
            
            <Typography variant="body1" className="product-category">
              Category: <span>{product.category}</span>
            </Typography>
            
            <Typography variant="body1" className="product-description">
              {product.description}
            </Typography>

            <Box className="quantity-price">
              <Typography variant="h6" className="quantity">
                Quantity: {quantity}
              </Typography>
              
              <Typography variant="h6" className="price">
                Total Price: ₹ {product.price * quantity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const AddressStep = () => (
    <Box className="address-step">
      <Typography variant="h6" className="section-title" align="center">
        Add Address
      </Typography>

      <Box className="address-form-container">
        <Box className="address-form">
          <TextField
            name="name"
            label="Name *"
            value={newAddress.name}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="contactNumber"
            label="Contact Number *"
            value={newAddress.contactNumber}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="street"
            label="Street *"
            value={newAddress.street}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="city"
            label="City *"
            value={newAddress.city}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="state"
            label="State *"
            value={newAddress.state}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="landmark"
            label="Landmark"
            value={newAddress.landmark}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />
          <TextField
            name="zipCode"
            label="Zip Code *"
            value={newAddress.zipCode}
            onChange={handleNewAddressChange}
            variant="outlined"
            fullWidth
            className="form-field"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={saveNewAddress}
            className="save-address-button"
          >
            SAVE ADDRESS
          </Button>
        </Box>
      </Box>

      <Box className="navigation-buttons">
        <Button
          onClick={handleBack}
          className="back-button"
        >
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="next-button"
        >
          NEXT
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Please select address!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        className="error-snackbar"
      />
    </Box>
  );

  const ConfirmOrderStep = () => (
    <Box className="confirm-order-step">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="order-summary">
            <Typography variant="h4" component="h2" className="section-title">
              {product.name}
            </Typography>
            
            <Box className="order-details">
              <Typography variant="body1">
                Quantity: <span>{quantity}</span>
              </Typography>
              
              <Typography variant="body1">
                Category: <span>{product.category}</span>
              </Typography>
              
              <Typography variant="body1" className="description">
                {product.description}
              </Typography>
              
              <Typography variant="h6" className="total-price">
                Total Price: ₹ {product.price * quantity}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box className="address-details">
            <Typography variant="h4" component="h2" className="section-title">
              Address Details:
            </Typography>
            
            {selectedAddress && (
              <Box className="address-info">
                <Typography variant="body1">{addresses.find(addr => addr.id === selectedAddress)?.name}</Typography>
                <Typography variant="body1">
                  Contact Number: {addresses.find(addr => addr.id === selectedAddress)?.contactNumber}
                </Typography>
                <Typography variant="body1">{addresses.find(addr => addr.id === selectedAddress)?.street}</Typography>
                <Typography variant="body1">{addresses.find(addr => addr.id === selectedAddress)?.city}</Typography>
                <Typography variant="body1">{addresses.find(addr => addr.id === selectedAddress)?.state}</Typography>
                <Typography variant="body1">{addresses.find(addr => addr.id === selectedAddress)?.zipCode}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box className="action-buttons">
        <Button
          onClick={handleBack}
          className="back-button"
        >
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          className="place-order-button"
        >
          PLACE ORDER
        </Button>
      </Box>

      <Snackbar
        open={orderSuccess}
        autoHideDuration={2000}
        message="Order placed successfully!"
        className="success-snackbar"
      />
    </Box>
  );

  return (
    <Container maxWidth="lg" className="create-order-container">
      <Stepper activeStep={activeStep} className="order-stepper">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              {index < activeStep ? (
                <span className="completed-step">✓</span>
              ) : label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className="step-content">
        {activeStep === 0 && <ProductDetailsStep />}
        {activeStep === 1 && <AddressStep />}
        {activeStep === 2 && <ConfirmOrderStep />}
      </Box>

      <Box className="step-actions">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="back-button"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="next-button"
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateOrder; 