const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const app = require('./app');

// starting server
const port = process.env.PORT || 7000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'));

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
