const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'https://prismatic-daifuku-97fb97.netlify.app', }));
// app.use(cors({ origin: 'http://localhost:5174', }));

const port = process.env.PORT || 5000;
const District = require('./district');
require('dotenv').config();
require('./db.js');

// get data
app.get('/api/districts', (req, res) => {
  District.find({})
    .then(districts => {
      res.json(districts);
    })
    .catch(err => {
      console.error(err)
    });
})

app.get('/api/search/districts', (req, res) => {
  const query = req.query.name;
  if (!query) {
    return res.json([]);
  }

  District.find({ districtName: new RegExp(query, 'i') })
    .then(districts => {
      res.json(districts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});