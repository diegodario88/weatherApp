const axios = require("axios").default;

/**
 * @param {string|undefined} query
 * @param {number|undefined} latitude
 * @param {number|undefined} longitude
 * @returns Promise of openWeather response
 */
const weatherService = async (query, latitude, longitude) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        q: query,
        lat: latitude,
        lon: longitude,
        lang: "pt_br",
        units: "metric",
        appid: "873a9710e07031c2b57d80f3ec7441b5",
      },
    };
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log("\x1b[31m", `Weather Service error ${error}`);
    throw error;
  }
};

/**
 * @param {string|undefined} query
 * @param {number|undefined} latitude
 * @param {number|undefined} longitude
 * @returns Promise of openWeather response
 */
const forecastService = async (query, latitude, longitude) => {
  try {
    const options = {
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast",
      params: {
        q: query,
        lat: latitude,
        lon: longitude,
        appid: "873a9710e07031c2b57d80f3ec7441b5",
        lang: "pt_br",
        units: "metric",
      },
    };

    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log("\x1b[31m", `Forecast Service error ${error}`);
    throw error;
  }
};

module.exports = { weatherService, forecastService };
