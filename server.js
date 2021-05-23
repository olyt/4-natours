const app = require('./app');

// starting server
const port = 7000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});