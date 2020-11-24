const assert = require('assert');
const fakeWeather = require('../openweather-mock.json');
const fakeForecast = require('../openForecast-mock.json');
const { weatherService } = require('../src/services/resourceService');
const Weather = require('../src/models/weather.model');
const Forecast = require('../src/models/forecast.model');


describe('Fetch Weather Api', () => {
    it('should return -> 200 OK', async () => {
        const result = await weatherService('', -23.55, -46.64);
        assert.strictEqual(result.status, 200);
    });
});

describe('Create Weather Model', () => {
    it('should return -> Weather property', async () => {
        const result = new Weather(fakeWeather);
        const test = result.toObject();
        assert.strictEqual(test.name, 'São Paulo');
    });
});

describe('Create Forecast Model', () => {
    it('should return -> Forecast property', async () => {
        const result = new Forecast(fakeForecast);
        const test = result.toObject();
        assert.strictEqual(test.city.name, 'Cuiabá');
    });
});
