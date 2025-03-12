import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './common/contexts/AuthContext';
import { CategoryProvider } from './common/contexts/CategoryContext';
import Navbar from './components/navbar/Navbar';
import CategoryToggle from './components/common/CategoryToggle';
import Products from './components/products/Products';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';
import Home from './components/home/Home';
import ProductDetails from './components/products/ProductDetails';
import CreateOrder from './components/order/CreateOrder';
import AddProduct from './components/admin/AddProduct';
import { SearchProvider } from './common/contexts/SearchContext';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <SearchProvider>
          <Router>
            <div className="App">
              <Navbar />
              <CategoryToggle />
              <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/products/:id" 
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order/:id" 
                  element={
                    <ProtectedRoute>
                      <CreateOrder />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-product" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AddProduct />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
