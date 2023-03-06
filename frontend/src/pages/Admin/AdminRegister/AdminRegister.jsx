import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminregister, reset } from '../../../features/auth/adminAuthSlice';
import Spinner from '../../../components/Spinner';
import AdminHeader from '../../../components/Admin/AdminHeader/AdminHeader';
import 'react-toastify/dist/ReactToastify.css';
import './AdminRegister.css';

function AdminRegister() {
  const [outletsList, setOutletsList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
    outlet: outletsList,
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/outlet')
      .then((res) => setOutletsList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const { name, email, password, password2, role, outlet } = formData;

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
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        role,
        outlet,
      };
      dispatch(adminregister(userData));
    }
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
            <FaUser /> Register
            <p>Please create an account </p>
          </h1>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Enter your Password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <select name="role" value={role} onChange={onChange}>
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Associate">Associate</option>
              </select>
            </div>

            <div className="form-group">
              <select name="outlet" value={outlet} onChange={onChange}>
                <option value="">Select Outlet</option>
                {outletsList.map((outlet) => (
                  <option key={outlet._id} value={outlet._id}>
                    {outlet.outletName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Sumbit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default AdminRegister;
