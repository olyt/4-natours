require('dotenv').config({ path: './config.env' });
const app = require('./app');

// starting server
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
