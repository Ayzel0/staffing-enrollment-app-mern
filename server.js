const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

const port = process.env.PORT || 5000;
const District = require('./district');
require('dotenv').config();
require('./db.js');

app.get('/api/districts', (req, res) => {
  District.find({})
    .then(districts => {
      res.json(districts);
    })
    .catch(err => {
      console.error(err)
    });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});