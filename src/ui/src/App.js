import './App.css';
import { useState, useEffect } from 'react';
import { TextField, Typography, } from '@material-ui/core';
import Logo from './components/logo-component.jsx';
import CardWeather from './components/card-component.jsx';
import Progress from './components/progress-component.jsx';
import { usePosition } from './hooks/usePosition.js';

const api = {
  BASE_URL: 'http://localhost:8080/api/v1/weather',
};

function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`${api.BASE_URL}?lat=${latitude}&lon=${longitude}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    }
  },[latitude, longitude]);

  const handleInput = ({ target }) => {
    const value = target.value;
    if (!value) {
      setIsLoading(false);
    }
    return setQuery(value);
  }

  const search = (e) => {
    if (query) {
      setIsLoading(true);
    }
    if (e.key === "Enter") {
      fetch(`${api.BASE_URL}?q=${query}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <section className="main-section">
          <Typography gutterBottom={true} variant={"h5"}>Como está o clima hoje?</Typography>
          <TextField
            onChange={handleInput}
            onKeyPress={search}
            value={query}
            id="cidade" label="Digite o nome da cidade..."
            helperText="Pressione Enter para ver o resultado"
            variant="outlined"
            color="secondary"
            size="medium"
            margin="normal"
          />
          {
            typeof weather.main === 'undefined'
              ? isLoading
                ? (<Progress />)
                : (<Logo />)
              : (<CardWeather props={weather} />)
          }
        </section>
      </main>
    </div>
  );
}

export default App;
