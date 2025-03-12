import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Snackbar
} from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifyProduct.css';
import { Close as CloseIcon } from '@material-ui/icons';

const ModifyProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://dev-project-ecommerce.upgrad.dev/api/products/categories',
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(product)
        }
      );

      if (response.ok) {
        setSuccessMessage(`Product ${product.name} modified successfully`);
        setTimeout(() => {
          navigate('/', { 
            state: { 
              showSuccessMessage: true,
              successMessage: `Product ${product.name} modified successfully`
            }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="modify-product-container">
      <Typography variant="h4" component="h1" className="page-title">
        Modify Product
      </Typography>

      <form onSubmit={handleSubmit} className="modify-form">
        <TextField
          name="name"
          label="Name *"
          value={product.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          className="form-field"
        />

        <TextField
          name="category"
          label="Category *"
          value={product.category}
          onChange={handleChange}
          select
          variant="outlined"
          fullWidth
          required
          className="form-field"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="manufacturer"
          label="Manufacturer *"
          value={product.manufacturer}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          className="form-field"
        />

        <TextField
          name="availableItems"
          label="Available Items *"
          value={product.availableItems}
          onChange={handleChange}
          type="number"
          variant="outlined"
          fullWidth
          required
          className="form-field"
        />

        <TextField
          name="price"
          label="Price *"
          value={product.price}
          onChange={handleChange}
          type="number"
          variant="outlined"
          fullWidth
          required
          className="form-field"
        />

        <TextField
          name="imageUrl"
          label="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          className="form-field"
        />

        <TextField
          name="description"
          label="Product Description"
          value={product.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          className="form-field"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="modify-button"
        >
          MODIFY PRODUCT
        </Button>
      </form>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        message={successMessage}
        className="success-snackbar"
      />
    </Container>
  );
};

export default ModifyProduct; 