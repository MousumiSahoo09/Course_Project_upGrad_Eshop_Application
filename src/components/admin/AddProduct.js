import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
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

  useEffect(() => {
    fetchCategories();
  }, []);

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
      setCategories(data.map(category => ({
        label: category,
        value: category
      })));
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

  const handleCategoryChange = (newValue) => {
    setProduct(prev => ({
      ...prev,
      category: newValue ? newValue.value : ''
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://dev-project-ecommerce.upgrad.dev/api/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(product)
        }
      );

      if (response.ok) {
        navigate('/', { 
          state: { 
            showSuccessMessage: true,
            successMessage: `Product ${product.name} added successfully`
          }
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '56px',
      borderColor: 'rgba(0, 0, 0, 0.23)',
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.87)'
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: 'rgba(0, 0, 0, 0.54)'
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100
    })
  };

  return (
    <Container maxWidth="sm" className="add-product-container">
      <Typography variant="h4" component="h1" className="page-title">
        Add Product
      </Typography>

      <form onSubmit={handleSubmit} className="add-form">
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

        <Box className="category-select-container">
          <CreatableSelect
            isClearable
            options={categories}
            onChange={handleCategoryChange}
            placeholder="Category *"
            className="category-select"
            styles={customStyles}
          />
        </Box>

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
          className="save-button"
        >
          SAVE PRODUCT
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct; 