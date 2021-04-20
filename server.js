'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;


//app.get method two arguments (endpoint, callback function(Can be multiple as well))
app.get('/weather', (request, response) => {
  try {
  const allDailyForecasts = weatherData.data.map(day => new DailyForecast(day));
  response.status(200).send(allDailyForecasts);
} catch(error) {
  handleErrors(error, response);
}
})

function DailyForecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleErrors (error, response) {
  response.status(500).send('Internal Server Error');
}
app.listen(PORT, () => console.log(`Listening on ${PORT}`))