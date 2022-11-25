const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

function logError(error) {
  console.log('Something went wrong...');
  console.log(error);
}

const DATABASE_NAME = 'yelpcamp';
mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
  .catch(error => logError(error));

const connection = mongoose.connection;
connection.on('error', error => logError(error));
connection.on('open', () => console.log(`Connected to ${DATABASE_NAME} database.`));
connection.on('disconnected', () => console.log(`Disconnected from ${DATABASE_NAME} database.`));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));

app.get('/campgrounds', async (request, response) => {
  const camps = await Campground.find({});
  response.render('campground/index', { camps });
});

app.get('/campgrounds/:id', async (request, response) => {
  const { id } = request.params;
  const camp = await Campground.findById(id);
  response.render('campground/show', { camp });
});