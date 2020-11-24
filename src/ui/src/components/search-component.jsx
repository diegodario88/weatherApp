import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../constants.js';

const SearchCities = ({ handleWeather, handleIsLoading }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const sleep = (delay = 0) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    const handleSelected = (e, value) => {
        if (value) {
            const { latitude, longitude } = value;
            handleIsLoading(true);
            handleWeather({});
            
            (async () => {
                const response = await fetch(`${api.BASE_URL}?lat=${latitude}&lon=${longitude}`);
                const weatherResponse = await response.json();
                handleWeather(weatherResponse);
            })();
        }
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const citiesJson = await import('../br.cities.list.json');
            await sleep(1e3);
            const citiesArray = Object.keys(citiesJson).map(key => citiesJson[key]).pop();

            if (active) {
                setOptions(citiesArray);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="search-cities"
            blurOnSelect="touch"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.codigo_ibge === value.codigo_ibge}
            getOptionLabel={(option) => option ? `${option.nome}, ${option.UFsigla}` : ''}
            options={options}
            loading={loading}
            loadingText="Carregando..."
            noOptionsText="Nenhuma opção encontrada"
            onChange={handleSelected}
            renderInput={(params) => (
                <TextField color="secondary"
                    {...params}
                    label="Cidades Brasileiras"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="secondary" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}

export default SearchCities;