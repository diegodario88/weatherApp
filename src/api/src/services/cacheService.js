const Weather = require("../models/weather.model");
const Forecast = require("../models/forecast.model");

const MINUTES = 16;
const SECONDS = MINUTES * 60;
const SIXTEEN_MINUTES_IN_MILLISECONDS = SECONDS * 1000;

/**
 * @param {Date} date
 * @returns date now subtracted 11 minutes
 */
const dateCacheBuilder = (date) => {
  const millisecondsInPast = Date.parse(date) - SIXTEEN_MINUTES_IN_MILLISECONDS;
  return new Date(millisecondsInPast);
};

/**
 * @param {string|undefined} q
 * @param {number|undefined} lon
 * @param {number|undefined} lat
 * @returns Promise of cached weather response
 */
async function cacheWeather(q, lon, lat) {
  if (!q && !lon && !lat) {
    throw new Error("All parameters are empty");
  }

  const query = {
    $or: [{ name: q }, { coord: { lon: lon, lat: lat } }],
  };
  const date = dateCacheBuilder(new Date());
  const result = await Weather.find(query).where("createdAt").gt(date);
  console.log("Successfully found Weather result on cache, returning it ...");
  return result;
}

/**
 * @param {string|undefined} q
 * @param {number|undefined} lon
 * @param {number|undefined} lat
 * @returns Promise of cached weather response
 */
async function cacheForecast(q, lon, lat) {
  if (!q && !lon && !lat) {
    throw new Error("All parameters are empty");
  }

  const query = {
    $or: [{ "city.name": q }, { "city.coord": { lat: lat, lon: lon } }],
  };
  const date = dateCacheBuilder(new Date());
  const result = await Forecast.find(query).where("createdAt").gt(date);
  console.log("Successfully found Forecast result on cache, returning it ...");
  return result;
}

module.exports = { cacheWeather, cacheForecast };
