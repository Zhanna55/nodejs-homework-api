const mongoose = require('mongoose');
const DB_HOST =
  'mongodb+srv://admin:uXegP9bc6nWblO2D@cluster0.ja5qbtf.mongodb.net/db-contacts?retryWrites=true&w=majority';
const app = require('./app');
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch(error => console.log(error.message));

// uXegP9bc6nWblO2D
