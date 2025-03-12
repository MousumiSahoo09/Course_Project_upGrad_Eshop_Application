import { API_BASE_URL, ENDPOINTS } from './config';
import { getAuthHeaders, handleResponse } from './apiUtils';

export const productService = {
  async getAllProducts() {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS.BASE}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS.BASE}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  async updateProduct(id, productData) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS.BASE}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS.BASE}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS.CATEGORIES}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
}; 