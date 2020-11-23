const Weather = require('../models/weather.model');
const weatherService = require('../services/weatherService');
const cacheService = require('../services/cacheService');

function index(req, res) {
    res.status(200).send({
        title: 'Weather - Api',
        description: 'Fornece informações sobre o clima',
        route: '/api/v1/weather',
        version: '1.0.0',
        author: 'Diego Dario',
    })
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function openWeather(req, res) {
    try {
        const { q, lon, lat } = req.query;
        const responseCache = await cacheService(q, lon, lat);

        if (responseCache.length) {
            return res.status(200).send(responseCache);
        }

        const { data } = await weatherService(q, lat, lon);
        const weather = new Weather(data);

        weather.save((err, doc) => {
            if (err) throw new Error(err);
            console.log("Document inserted successfully! docId:", doc._id);
        })

        return res.status(200).send(data);
    } catch (error) {
        console.error('Are we up? 🤔', error.message);
        return res.status(400);
    }
}

module.exports = { index, openWeather }