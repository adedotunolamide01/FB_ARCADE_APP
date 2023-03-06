// export default SalesForm;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { createSale } from '../../../features/sales/saleSlice';
import { reset } from '../../../features/auth/adminAuthSlice';
import AdminHeader from '../../../components/Admin/AdminHeader/AdminHeader';
// import SideList from '../../../components/Admin/Sidebar/Sidebair';
import Spinner from '../../../components/Spinner';
import './SalesForm.css';

const SalesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminuser } = useSelector((state) => state.adminauth);
  const { isLoading, isError } = useSelector((state) => state.sale);

  useEffect(() => {
    if (!adminuser) {
      navigate('/admin_3xyftvk/login');
    }
    dispatch(reset());
  }, [adminuser, dispatch, navigate, isLoading]);

  const [tickets, setTickets] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ticket');
        const data = response.data.map((ticket) => ({
          ...ticket,
          ticketCount: '',
          totalCost: 0,
        }));
        setTickets(data);
      } catch (error) {
        console.error(error);
        setFormError('Failed to load tickets');
      }
    };
    fetchTickets();
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
    const totalCost = calculateTotalCost(newTickets);
    setTotalCost(totalCost);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any ticket count is empty
    if (tickets.some((ticket) => ticket.ticketCount === '')) {
      setFormError('Please enter ticket counts for all tickets');
      return;
    }

    // Create sales data object
    const salesData = {
      sales: tickets.map((ticket) => ({
        ticketName: ticket.ticketName,
        ticketAmount: ticket.ticketAmount,
        ticketId: ticket._id,
        ticketCount: parseInt(ticket.ticketCount) || 0,
      })),
      adminUser: adminuser._id,
      outletId: adminuser.outlet,
    };
    console.log('salesData frontend :', salesData);

    // Calculate total cost
    let totalCost = 0;
    for (let i = 0; i < salesData.sales.length; i++) {
      totalCost +=
        salesData.sales[i].ticketAmount * salesData.sales[i].ticketCount;
    }

    salesData.totalCost = totalCost;

    try {
      dispatch(createSale(salesData));

      // Reset form
      setTickets(tickets.map((ticket) => ({ ...ticket, ticketCount: '' })));
      setTotalCost(0);
      setFormError('');
    } catch (error) {
      console.error(error);
      setFormError('Failed to submit sales data');
    }
  };
  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container">
        <AdminHeader />
        <section class="heading">
          <h2>Input Daily Sales {formattedDate}</h2>
        </section>

        <div class="form-container">
          <div class="sidelist-container">{/* <SideList /> */}</div>

          <div class="form-content">
            <form class="sales-form" onSubmit={handleSubmit}>
              <div class="tickets-container">
                {tickets.map((ticket, index) => (
                  <div class="ticket" key={index}>
                    <h2 class="ticket-amount">
                      Arcade Ticket #{ticket.ticketAmount}
                    </h2>
                    <label
                      class="ticket-label"
                      for={`ticketCount-${index}`}
                    ></label>
                    <input
                      class="ticket-input"
                      type="number"
                      id={`ticketCount-${index}`}
                      name={`ticketCount-${index}`}
                      value={ticket.ticketCount}
                      onChange={(e) => handleTicketCountChange(index)(e)}
                      min={0}
                    />
                  </div>
                ))}
              </div>

              <div class="total-cost-container">
                {totalCost === 0 && (
                  <p class="total-cost-message">
                    Please purchase at least one ticket.
                  </p>
                )}
                <p class="total-cost">Total Cost: {totalCost}</p>
              </div>

              <button class="submit-button" type="submit">
                Submit
              </button>
            </form>

            {isError && <p class="error-message">Failed to load data.</p>}
            {formError && <p class="error-message">{formError}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesForm;
