const express = require('express');

const router = express.Router();

app.get('/', (req, res) => {
  res.json({ message: 'get outlet' });
});

app.get('/', (req, res) => {
  res.json({ message: 'set outlet' });
});

app.post('/', (req, res) => {
  res.json({ message: 'get outlet' });
});

app.get('/api/outlet', (req, res) => {
  res.json({ message: 'get outlet' });
});

module.exports = router;
