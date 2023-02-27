import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import { ToastContainer } from 'react-toastify';
import Register from './pages/ExteralUser/Register';
import Login from './pages/ExteralUser/Login';
import HomePage from './pages/ExteralUser/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import SalesForm from './pages/Admin/SalesForm';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin_3xyftvk/dashboard" element={<Dashboard />} />
            <Route path="/admin_3xyftvk/login" element={<AdminLogin />} />
            <Route path="/admin_3xyftvk/register" element={<AdminRegister />} />
            <Route path="/admin_3xyftvk/sales" element={<SalesForm />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
