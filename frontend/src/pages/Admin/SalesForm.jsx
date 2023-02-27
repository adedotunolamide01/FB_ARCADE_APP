import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { createSale } from '../../features/sales/saleSlice';
import { reset } from '../../features/auth/adminAuthSlice';
import AdminHeader from '../../components/Admin/AdminHeader';
import SideList from '../../components/Admin/Sidebar';
import Spinner from '../../components/Spinner';

const SalesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminuser } = useSelector((state) => state.adminauth);
  const { isLoading, isError, message } = useSelector((state) => state.sale);

  useEffect(() => {
    // if (!adminusers) {
    //   navigate('admin_3xyftvk/login');
    // }
    if (adminuser) {
      dispatch(createSale());
    } else {
      navigate('admin_3xyftvk/login');
    }
    dispatch(reset());
  }, [dispatch, isError, message, navigate, adminuser]);

  const [tickets, setTickets] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/ticket')
      .then((res) => {
        setTickets(
          res.data.map((ticket) => ({
            ...ticket,
            ticketCount: '',
            totalCost: 0,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
        setFormError('Failed to load tickets');
      });
  }, []);

  const calculateTotalCost = (tickets) => {
    return tickets.reduce((acc, ticket) => acc + ticket.totalCost, 0);
  };

  const handleTicketCountChange = (index) => (e) => {
    const newTickets = [...tickets];

    const ticketCount = parseInt(e.target.value);
    if (ticketCount < 1 || isNaN(ticketCount)) {
      setFormError('Please enter a valid ticket count');
      return;
    }

    newTickets[index].ticketCount = ticketCount;
    newTickets[index].totalCost = newTickets[index].ticketAmount * ticketCount;
    setTickets(newTickets);
    setTotalCost(calculateTotalCost(newTickets));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tickets.some((ticket) => ticket.ticketCount === '')) {
      setFormError('Please enter ticket counts for all tickets');
      return;
    }

    // Get token from store
    const token = await adminuser.token;
    console.log('token:', token);

    try {
      const salesData = tickets.map((ticket) => ({
        ticketName: ticket.ticketName,
        ticketAmount: ticket.ticketAmount,
        ticketId: ticket._id,
        ticketCount: ticket.ticketCount,
        totalCost: ticket.totalCost,
        adminUser: adminuser._id,
        outletId: adminuser.outlet,
      }));

      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      for (let i = 0; i < salesData.length; i++) {
        const res = await axios.post(
          'http://localhost:5000/api/sales',
          salesData[i]
        );
        dispatch(createSale(res.data));
      }
      // reset form and state
      setTickets(
        tickets.map((ticket) => ({
          ...ticket,
          ticketCount: '',
          totalCost: 0,
        }))
      );
      setTotalCost(0);
      setFormError('');
    } catch (error) {
      console.error(error);
      setFormError('Failed to submit sales data');
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <AdminHeader />
      <section className="heading">
        <h1>Welcome {adminuser && adminuser.name && adminuser._id}</h1>
        <p>Sales Input Dashboard</p>
      </section>
      <SideList />
      {formError && <p>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {tickets.map((ticket, index) => (
            <div key={index}>
              <h2>{ticket.ticketName}</h2>
              <p>{ticket.ticketAmount}</p>
              <label htmlFor={`ticketCount-${index}`}>Number of Tickets:</label>
              <input
                type="number"
                id={`ticketCount-${index}`}
                value={ticket.ticketCount}
                onChange={handleTicketCountChange(index)}
              />
            </div>
          ))}
        </div>
        <p>Total Cost: {totalCost}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SalesForm;
