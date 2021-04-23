'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

app.get('/weather', (request, response) => {
  try {
    superagent.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${request.query.lat}&lon=${request.query.lon}`)
      .then(results => {
        const allDailyForecasts = results.body.data.map(day => new DailyForecast(day));
        response.send(allDailyForecasts);
      })
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Broken');
  }
})