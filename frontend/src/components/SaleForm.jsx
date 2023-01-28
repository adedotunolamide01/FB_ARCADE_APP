import React, { useState } from 'react';
import axios from 'axios';

function SaleForm() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sales', { amount, date });
      alert('Sale record added successfully');
      setAmount('');
      setDate('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SaleForm;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addSale } from './actions/salesActions';

// function SaleForm() {
//     const [amount, setAmount] = useState('');
//     const [date, setDate] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(addSale({ amount, date }));
//             alert('Sale record added successfully');
//             setAmount('');
//             setDate('');
//         } catch (err) {
//             alert(err.message);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Amount:
//                 <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
//             </label>
//             <br />
//             <label>
//                 Date:
//                 <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

// export default SaleForm;
