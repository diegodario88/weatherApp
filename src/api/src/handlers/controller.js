const Forecast = require("../models/forecast.model");
const Weather = require("../models/weather.model");
const {
  weatherService,
  forecastService,
} = require("../services/resourceService");
const { cacheWeather, cacheForecast } = require("../services/cacheService");

function index(req, res) {
  res.status(200).send({
    title: "Weather - Api",
    description: "Fornece informações sobre o clima",
    route: "/api/v1/weather",
    version: "1.0.0",
    author: "Diego Dario",
  });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function openWeather(req, res) {
  try {
    let { q, lon, lat } = req.query;
    lon = +Number(lon).toFixed(1);
    lat = +Number(lat).toFixed(1);

    const responseCache = await cacheWeather(q, lon, lat);
    const isResponse = responseCache.length;
    if (isResponse) {
      return res.status(200).send(responseCache[isResponse - 1]);
    }

    const { data } = await weatherService(q, lat, lon);
    const weather = new Weather(data);

    weather.save((err, doc) => {
      if (err) throw new Error(err);
      console.log("Weather inserted successfully! docId:", doc._id);
    });

    return res.status(200).send(data);
  } catch (error) {
    console.error("Are we up? 🤔", error.message);
    return res.status(400).send();
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function openWeatherForecast(req, res) {
  try {
    let { q, lon, lat } = req.query;
    lon = +Number(lon).toFixed(1);
    lat = +Number(lat).toFixed(1);

    const responseCache = await cacheForecast(q, lon, lat);
    const isResponse = responseCache.length;
    if (isResponse) {
      return res.status(200).send(responseCache[isResponse - 1]);
    }

    const { data } = await forecastService(q, lat, lon);
    const forecast = new Forecast(data);

    forecast.save((err, doc) => {
      if (err) throw new Error(err);
      console.log("Forecast inserted successfully! docId:", doc._id);
    });

    return res.status(200).send(data);
  } catch (error) {
    console.error("Are we up? 🤔", error.message);
    return res.status(400).send();
  }
}

module.exports = { index, openWeather, openWeatherForecast };
