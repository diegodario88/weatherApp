const Weather = require('../models/weather.model');
const weatherService = require('../services/weatherService');

function index(req, res) {
    res.status(200).send({
        title: 'Weather - Api',
        description: 'Fornece informações sobre o clima',
        route: '/api/v1/weather',
        version: '1.0.0',
        author: 'Diego Dario',
    })
}

function fakeWeather(req, res) {
    try {
        const entries = require('../../openweather-mock.json');
        if (entries) return res.status(200).json(entries);
        return res.status(400);
    } catch (error) {
        console.error('Are we empty? 🤔');
    }
}
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function openWeather(req, res) {
    try {
        const { q, lat, lon } = req.query;

        const { data } = await weatherService(q, lat, lon);
        
        const weather = new Weather(data);

        weather.save((err, doc) => {
            if (err) throw new Error(err);
            console.log("Document inserted successfully! docId:", doc._id);
        })

        res.status(200).send(data);
    } catch (error) {
        console.error('Are we up? 🤔');
        return res.status(400);
    }
}

module.exports = { index, fakeWeather, openWeather }