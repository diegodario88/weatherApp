import './App.css';
import { useState, useEffect } from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import Logo from './components/logo-component.jsx';
import CardWeather from './components/card-component.jsx';
import Progress from './components/progress-component.jsx';
import Search from './components/search-component.jsx';
import { usePosition } from './hooks/usePosition.js';
import api from './constants.js';
import ForecastList from './components/forecast-component';
import Copyright from './components/footer-component';

function App() {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      (async () => {
        const firstResponse = await fetch(`${api.WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}`);
        const secondResponse = await fetch(`${api.FORECAST_BASE_URL}?lat=${latitude}&lon=${longitude}`);
        const weatherResponse = await firstResponse.json();
        const forecastResponse = await secondResponse.json();
        setWeather(weatherResponse);
        setForecast(forecastResponse);
      })();
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <main className="App-main">
        <section className="main-section">
          <Typography gutterBottom={true} variant={"h5"}>Como está o clima hoje?</Typography>
          <Search handleWeather={setWeather} handleForecast={setForecast} handleIsLoading={setIsLoading} />
          {
            typeof weather.main === 'undefined' && typeof forecast.message === 'undefined'
              ? isLoading
                ? (<Progress />)
                : (<Logo />)
              : (
                <Container>
                  <CardWeather props={weather} />
                  <Typography gutterBottom={true} variant={"h5"}>Previsão para os próximos dias</Typography>
                  <Divider />
                  <ForecastList props={forecast} />
                </Container>
              )
          }
        </section>
        <Copyright />
      </main>
    </div >
  );
}

export default App;
