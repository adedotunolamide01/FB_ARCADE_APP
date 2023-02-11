import React, { useState } from 'react';
import axios from 'axios';

const ticketPrices = {
  '63ded2af4d5016aebf851cab': 700,
  '63ded38e4d5016aebf851cad': 1200,
  '63ded3b04d5016aebf851caf': 1000,
  '63ded3f04d5016aebf851cb1': 500,
  '63ded4134d5016aebf851cb3': 300,
};

const SalesForm = () => {
  const [ticket1, setTicket1] = useState(0);
  const [ticket2, setTicket2] = useState(0);
  const [ticket3, setTicket3] = useState(0);
  const [ticket4, setTicket4] = useState(0);
  const [ticket5, setTicket5] = useState(0);
  const [date, setdate] = useState(0);
  const [total, setTotal] = useState(0);

  const handleTicket1Change = (event) => {
    setTicket1(event.target.value);
  };

  const handleTicket2Change = (event) => {
    setTicket2(event.target.value);
  };

  const handleTicket3Change = (event) => {
    setTicket3(event.target.value);
  };

  const handleTicket4Change = (event) => {
    setTicket4(event.target.value);
  };

  const handleTicket5Change = (event) => {
    setTicket5(event.target.value);
  };
  const handletimeChange = (event) => {
    setdate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTotal(
      ticketPrices['63ded2af4d5016aebf851cab'] * ticket1 +
        ticketPrices['63ded38e4d5016aebf851cad'] * ticket2 +
        ticketPrices['63ded3b04d5016aebf851caf'] * ticket3 +
        ticketPrices['63ded3f04d5016aebf851cb1'] * ticket4 +
        ticketPrices['63ded4134d5016aebf851cb3'] * ticket5
    );
    const formData = {
      ticket1,
      ticket2,
      ticket3,
      ticket4,
      ticket5,
      date,
      total,
    };

    try {
      await axios.post('/api/sales', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ticket 1:
        <input type="number" value={ticket1} onChange={handleTicket1Change} />
      </label>
      <br />
      <label>
        Ticket 2:
        <input type="number" value={ticket2} onChange={handleTicket2Change} />
      </label>
      <br />
      <label>
        Ticket 3:
        <input type="number" value={ticket3} onChange={handleTicket3Change} />
      </label>
      <br />
      <label>
        Ticket 4:
        <input type="number" value={ticket4} onChange={handleTicket4Change} />
      </label>
      <br />
      <label>
        Ticket 5:
        <input type="number" value={ticket5} onChange={handleTicket5Change} />
      </label>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={handletimeChange}
          required
        />
      </div>

      <p>Total: {total}</p>
      <br />
      <button type="submit">Submit</button>
      <br />
    </form>
  );
};

export default SalesForm;
