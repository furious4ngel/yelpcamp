const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const campNames = require('./campgrounds');

function logError(error) {
  console.log('Something went wrong...',);
  console.log(error);
}

function getSample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getPrice(max = 0, base = 0) {
  return Math.floor(Math.random() * max) + base;
}

const DATABASE_NAME = 'yelpcamp';
mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
  .catch(error => logError(error));

const connection = mongoose.connection;
connection.on('error', error => logError(error));
connection.on('open', () => console.log(`Connected to ${DATABASE_NAME} database.`));
connection.on('disconnected', () => console.log(`Disconnected from ${DATABASE_NAME} database.`));

async function seedDatabase() {
  try {
    await Campground.deleteMany({});

    const camps = [];
    for (let i = 0; i < 50; i++) {
      const DESCRIPTOR = getSample(campNames.descriptors);
      const PLACE = getSample(campNames.places);
      const location = getSample(cities);
      const PRICE = getPrice(51, 20);

      camps.push(
        new Campground({
          title: `${DESCRIPTOR} ${PLACE}`,
          location: `${location.city}, ${location.state}`,
          price: PRICE,
          description: `Welcome to ${DESCRIPTOR} ${PLACE}. Located in ${location.city}, ${location.state}, it costs $${PRICE}/night.`
        })
      );
    }

    const campDocuments = await Campground.insertMany(camps);
    console.log(campDocuments);

  } catch (error) {
    logError(error);
  }
}

seedDatabase().then(() => mongoose.connection.close());