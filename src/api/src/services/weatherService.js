const axios = require('axios').default;

/**
 * @param {string|undefined} query 
 * @param {number|undefined} lat 
 * @param {number|undefined} lon
 * @returns Promise of openWeather response 
 */
const weatherService = async (query, lat, lon) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
                q: `${query}` || '',
                lat: `${lat}` || 0,
                lon: `${lon}` || 0,
                id: '2172797',
                lang: 'pt_br',
                units: 'metric',
                mode: 'xml, html'
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

module.exports = weatherService;