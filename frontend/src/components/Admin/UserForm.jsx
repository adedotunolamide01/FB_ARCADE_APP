// import React, { useState } from 'react';
// import axios from 'axios';

// const UserForm = () => {
//   const [ticket1, setTicket1] = useState(0);
//   const [ticket2, setTicket2] = useState(0);
//   const [ticket3, setTicket3] = useState(0);
//   const [ticket4, setTicket4] = useState(0);
//   const [ticket5, setTicket5] = useState(0);
//   const [total, setTotal] = useState(0);

//   const handleTicket1Change = (event) => {
//     setTicket1(event.target.value);
//   };

//   const handleTicket2Change = (event) => {
//     setTicket2(event.target.value);
//   };

//   const handleTicket3Change = (event) => {
//     setTicket3(event.target.value);
//   };

//   const handleTicket4Change = (event) => {
//     setTicket4(event.target.value);
//   };

//   const handleTicket5Change = (event) => {
//     setTicket5(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setTotal(
//       parseInt(ticket1) +
//         parseInt(ticket2) +
//         parseInt(ticket3) +
//         parseInt(ticket4) +
//         parseInt(ticket5)
//     );
//     const formData = {
//       ticket1,
//       ticket2,
//       ticket3,
//       ticket4,
//       ticket5,
//       total,
//     };
//     try {
//       await axios.post('<your server endpoint>', formData);
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Ticket 1:
//         <input type="number" value={ticket1} onChange={handleTicket1Change} />
//       </label>
//       <br />
//       <label>
//         Ticket 2:
//         <input type="number" value={ticket2} onChange={handleTicket2Change} />
//       </label>
//       <br />
//       <label>
//         Ticket 3:
//         <input type="number" value={ticket3} onChange={handleTicket3Change} />
//       </label>
//       <br />
//       <label>
//         Ticket 4:
//         <input type="number" value={ticket4} onChange={handleTicket4Change} />
//       </label>
//       <br />
//       <label>
//         Ticket 5:
//         <input type="number" value={ticket5} onChange={handleTicket5Change} />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//       <br />
//       <p>Total: {total}</p>
//     </form>
//   );
// };

// export default UserForm;
