import React from 'react';
import AdminHeader from '../../../components/Admin/AdminHeader/AdminHeader';

import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminlogin, reset } from '../../../features/auth/adminAuthSlice';
import Spinner from '../../../components/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminuser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminauth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || adminuser) {
      navigate('/admin_3xyftvk/dashboard');
    }

    dispatch(reset());
  }, [adminuser, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    const userData = {
      email,
      password,
    };

    dispatch(adminlogin(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container">
        <AdminHeader />
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Foodco Arcade Center</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your Email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your Password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default AdminLogin;
