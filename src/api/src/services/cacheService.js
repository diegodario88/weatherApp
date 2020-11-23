const Weather = require('../models/weather.model');

/**
 * @param {Date} date
 * @returns date now subtracted 11 minutes
 */
const dateCacheBuilder = (date) => {
    let milliseconds = Date.parse(date);
    milliseconds = milliseconds - (11 * 60 * 1000);
    return new Date(milliseconds);
}

/**
 * @param {string|undefined} q
 * @param {number|undefined} lon
 * @param {number|undefined} lat
 * @returns Promise of cached weather response
 */
async function cacheWeather(q, lon, lat) {
    const query = {
        $or: [{ name: q }, { coord: { lon: lon, lat: lat } }]
    }
    const date = dateCacheBuilder(new Date());
    const result = await Weather.find(query).where('createdAt').gt(date);
    return result;
}

module.exports = cacheWeather;