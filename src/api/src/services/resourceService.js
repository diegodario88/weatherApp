const axios = require('axios').default;

/**
 * @param {string|undefined} query 
 * @param {number|undefined} latitude 
 * @param {number|undefined} longitude
 * @returns Promise of openWeather response 
 */
const weatherService = async (query, latitude, longitude) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
                q: query,
                lat: latitude,
                lon: longitude,
                id: '2172797',
                lang: 'pt_br',
                units: 'metric',
            },
            headers: {
                'x-rapidapi-key': 'ec95ba958bmsh4bce351997b41f0p14d100jsna6c63dbc7efd',
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log("\x1b[31m", `Weather Service error ${error}`)
    }
}

/**
 * @param {string|undefined} query 
 * @param {number|undefined} latitude 
 * @param {number|undefined} longitude
 * @returns Promise of openWeather response 
 */
const forecastService = async (query, latitude, longitude) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
            params: {
                q: query,
                lat: latitude,
                lon: longitude,
                cnt: '10',
                id: '2172797',
                lang: 'pt_br',
                units: 'metric',
            },
            headers: {
                'x-rapidapi-key': 'ec95ba958bmsh4bce351997b41f0p14d100jsna6c63dbc7efd',
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log("\x1b[31m", `Forecast Service error ${error}`)
    }
}

module.exports = { weatherService, forecastService };