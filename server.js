'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function DailyForecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;
}

app.get('/weather', (request, response) => {
  try {
  const allDailyForecasts = weatherData.data.map(day => new DailyForecast(day));
  response.send(allDailyForecasts);
} catch(error) {
  console.error(error.message);
}
})
// //app.get method two arguments (endpoint, callback function(Can be multiple as well))


// function handleErrors (error, response) {
//   response.status(500).send('Internal Server Error');
// }
// app.listen(PORT, () => console.log(`Listening on ${PORT}`))