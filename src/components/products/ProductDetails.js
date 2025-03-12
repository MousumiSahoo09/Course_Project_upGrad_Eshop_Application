import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button,
  Box,
  Chip
} from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.availableItems) {
      setQuantity(value);
    }
  };

  const handlePlaceOrder = () => {
    navigate(`/order/${id}`, { 
      state: { 
        quantity,
        product 
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Container maxWidth="xl" className="product-details-container">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.alt = 'Product image not available';
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box className="product-info">
            <Box className="product-header">
              <Typography variant="h4" component="h1" className="product-name">
                {product.name}
              </Typography>
              <Chip 
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
                className="availability-chip"
              />
            </Box>

            <Typography variant="body1" className="category">
              Category: <span className="category-name">{product.category}</span>
            </Typography>

            <Typography variant="body1" className="description">
              {product.description}
            </Typography>

            <Typography variant="h5" className="price">
              ₹ {product.price}
            </Typography>

            <Box className="order-section">
              <TextField
                label="Enter Quantity *"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                variant="outlined"
                InputProps={{
                  inputProps: { 
                    min: 1, 
                    max: product.availableItems 
                  }
                }}
                className="quantity-input"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                className="place-order-button"
                disabled={quantity < 1 || quantity > product.availableItems}
              >
                PLACE ORDER
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails; 