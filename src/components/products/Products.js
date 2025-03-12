import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  IconButton
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useCategory } from '../../common/contexts/CategoryContext';
import { useSearch } from '../../common/contexts/SearchContext';
import { useLocation } from 'react-router-dom';
import CategoryTabs from './CategoryTabs';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const { selectedCategory } = useCategory();
  const { searchQuery } = useSearch();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('highToLow');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  useEffect(() => {
    if (location.state?.showSuccessMessage) {
      setSuccessMessage(location.state.successMessage);
      // Clear the state after showing the message
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'https://dev-project-ecommerce.upgrad.dev/api/products';
      if (selectedCategory && selectedCategory !== 'ALL') {
        url += `?category=${selectedCategory}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      sortProducts(data, sortBy);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    sortProducts(filteredProducts, newSortBy);
  };

  const sortProducts = (productsToSort, sortType) => {
    let sortedProducts = [...productsToSort];
    
    switch (sortType) {
      case 'highToLow':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'lowToHigh':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      default:
        // Keep original order from API
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  return (
    <>
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

      <Container maxWidth="xl" className="products-page">
        <CategoryTabs categories={categories} />
        
        <Box className="sort-section">
          <Typography component="span" className="sort-label">
            Sort By:
          </Typography>
          <FormControl variant="outlined" className="sort-select-container">
            <Select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard 
                product={product} 
                onDelete={handleDeleteProduct}
              />
            </Grid>
          ))}
          {filteredProducts.length === 0 && !loading && (
            <Box className="no-results">
              <Typography variant="h6">
                No products found matching your search.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Products; 