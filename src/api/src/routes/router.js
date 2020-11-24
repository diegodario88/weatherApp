const { Router } = require('express');
const Handlers = require('../handlers/controller');

const router = Router();

router.get('/', Handlers.index);
router.get('/api/v1/weather', Handlers.openWeather);
router.get('/api/v1/forecast', Handlers.openWeatherForecast);

module.exports = router;