const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const database = 'yelpcamp';
mongoose.connect(`mongodb://localhost:27017/${database}`)
  .then(() => console.log(`Connected to ${database} database.`))
  .catch((error) => console.log(error));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));

app.get('/', (request, response) => {
  response.send('YELPCAMP HOME');
});