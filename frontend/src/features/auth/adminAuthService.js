import axios from 'axios';

const API_URL = '/api/adminusers/';

// Register user
const adminregister = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('adminuser', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const adminlogin = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('adminuser', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const adminlogout = () => {
  localStorage.removeItem('adminuser');
};

const adminAuthService = {
  adminregister,
  adminlogout,
  adminlogin,
};

export { adminregister, adminlogout, adminlogin };

export default adminAuthService;
