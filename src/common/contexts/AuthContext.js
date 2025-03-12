const checkAdminStatus = (userData) => {
  return userData?.role?.includes('ADMIN') || false;
}; 