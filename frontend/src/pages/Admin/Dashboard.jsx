import React, { useEffect } from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import Sidebar from '../../components/Admin/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
      <div>
        <AdminHeader />
      </div>
      <Sidebar />
      <h1>Backend Dashboard</h1>
    </div>
  );
}

export default Dashboard;
