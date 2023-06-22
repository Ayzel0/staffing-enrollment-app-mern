const express = require('express');
const cors = require('cors');
const app = express();
const allowedOrigins = ['http://localhost:5173', 'https://prismatic-daifuku-97fb97.netlify.app'];

app.use(cors({
  origin: (origin) => {
    if(!origin) return true;
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return Promise.reject(new Error(msg));
    }
    return Promise.resolve(true);
  }
}));

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