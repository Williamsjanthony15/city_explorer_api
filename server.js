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

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.averageVotes = movie.vote_average;
  this.totalVotes = movie.vote_count;
  this.imgURL = movie.poster_path? ('https://image.tmdb.org/t/p/w500' + movie.poster_path): '';
  this.popularity = movie.popularity;
  this.releasedOn = movie.release_date;
}

app.get('/movies', (request, response) => {
  try {
    superagent.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.city}`)
      .then(results => {
        console.log('these are your movie results', results.body.results);
        const movieData = results.body.results.map(movie => new Movie(movie));
        response.send(movieData);
      })
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Broken');
  }
})