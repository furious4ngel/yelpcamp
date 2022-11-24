const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const DATABASE_NAME = 'yelpcamp';
mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
  .catch((error) => console.log(error));

const connection = mongoose.connection;
connection.on('error', error => console.error(error));
connection.on('open', () => console.log(`Connected to ${DATABASE_NAME} database.`));
connection.on('disconnected', () => console.log(`Disconnected from ${DATABASE_NAME} database.`));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));

app.get('/', (request, response) => {
  response.send('YELPCAMP HOME');
});