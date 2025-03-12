import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn } = useAuth();
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  if (adminOnly && !isAdmin) {
    navigate('/');
    return null;
  }

  return children;
};

export default ProtectedRoute; 