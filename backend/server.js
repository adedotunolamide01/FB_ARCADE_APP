const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const cors = require('cors');

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use('/api/admin/users', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutesEx'));
app.use('/api/outlet', require('./routes/outletRoutes'));
app.use('/api/ticket', require('./routes/ticketRoutes'));

app.use('/api/sales', require('./routes/salesRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
