import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import AdminHeader from '../../../components/Admin/AdminHeader/AdminHeader';

function Dashboard() {
  const { adminuser } = useSelector((state) => state.adminauth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminuser) {
      navigate('/admin_3xyftvk/login');
    }
  }, [navigate, adminuser]);

  return (
    <div>
      <AdminHeader />
      <h1> bashboard</h1>
    </div>
  );
}

export default Dashboard;
