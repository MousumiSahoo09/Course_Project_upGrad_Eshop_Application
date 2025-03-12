import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        setDeleteDialogOpen(false);
        setSuccessMessage(`Product ${product.name} deleted successfully`);
        setTimeout(() => {
          onDelete(product.id);
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="product-card">
        <CardMedia
          component="img"
          className="product-image"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent className="product-content">
          <Box className="product-header">
            <Typography variant="h6" component="h2" className="product-name">
              {product.name}
            </Typography>
            <Typography variant="h6" component="p" className="product-price">
              ₹ {product.price}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            color="textSecondary" 
            className="product-description"
          >
            {product.description}
          </Typography>

          <Box className="product-actions">
            {isAdmin ? (
              <Box className="admin-actions">
                <IconButton 
                  size="small" 
                  onClick={handleEdit}
                  className="edit-button"
                  aria-label="Edit product"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={handleDeleteClick}
                  className="delete-button"
                  aria-label="Delete product"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/products/${product.id}`)}
                className="buy-button"
              >
                BUY
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        className="delete-dialog"
      >
        <DialogTitle>
          Confirm deletion of product!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the product?
          </Typography>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button
            onClick={handleDeleteConfirm}
            color="primary"
            variant="contained"
            className="ok-button"
          >
            OK
          </Button>
          <Button
            onClick={handleDeleteCancel}
            className="cancel-button"
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>

      {successMessage && (
        <Box className="success-notification">
          <Typography className="success-message">
            {successMessage}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setSuccessMessage('')}
            className="close-button"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default ProductCard; 