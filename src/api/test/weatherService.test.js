const assert = require('assert');
const fakeWeather = require('../openweather-mock.json');
const weatherService = require('../src/services/weatherService');
const Weather = require('../src/models/weather.model');


describe('Fetch Weather Api', () => {
    it('should return -> 200 OK', async () => {
        const result = await weatherService('', -23.55, -46.64);
        assert.strictEqual(result.status, 200);
    });
});

describe('Create Weather Model', () => {
    it('should return -> Weather instance', async () => {
        const result = new Weather(fakeWeather);
        const test = result.toObject();
        assert.strictEqual(test.name, 'São Paulo');
    });
});
