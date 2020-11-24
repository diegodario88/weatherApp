import './App.css';
import { useState, useEffect } from 'react';
import { Typography, } from '@material-ui/core';
import Logo from './components/logo-component.jsx';
import CardWeather from './components/card-component.jsx';
import Progress from './components/progress-component.jsx';
import Search from './components/search-component.jsx';
import { usePosition } from './hooks/usePosition.js';
import api from './constants.js';

function App() {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      (async () => {
        const response = await fetch(`${api.BASE_URL}?lat=${latitude}&lon=${longitude}`);
        const weatherResponse = await response.json();
        setWeather(weatherResponse);
      })();
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <main className="App-main">
        <section className="main-section">
          <Typography gutterBottom={true} variant={"h5"}>Como está o clima hoje?</Typography>
          <Search handleWeather={setWeather} handleIsLoading={setIsLoading} />
          {
            typeof weather.main === 'undefined'
              ? isLoading
                ? (<Progress />)
                : (<Logo />)
              : (<CardWeather props={weather} />)
          }
        </section>
      </main>
    </div >
  );
}

export default App;
