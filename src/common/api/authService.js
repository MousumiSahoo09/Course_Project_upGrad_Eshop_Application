import { API_BASE_URL, ENDPOINTS } from './config';

export const authService = {
  async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.SIGNUP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Signup failed: ' + error.message);
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.SIGNIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const token = response.headers.get('x-auth-token');
      if (token) {
        localStorage.setItem('token', token);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  },
}; 