// connection setup
const mongoose = require('mongoose');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbClusterUrl = process.env.DB_CLUSTER_URL;
const connStr = `mongodb+srv://${dbUsername}:${dbPassword}@${dbClusterUrl}/${dbName}?retryWrites=true&w=majority`

mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('success');
}).catch((err) => {
  console.error('Database connection error:', err);
})