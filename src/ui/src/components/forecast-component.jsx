import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
        textTransform: 'capitalize',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        maxWidth: '80%',
        position: 'relative',
        top: '-10%',
        left: '10%'
    },
    temp: {
        fontSize: '0.75rem',
    },
    information: {
        paddingTop: '1.5rem'
    }
}));

const ForecastList = ({ props }) => {
    const classes = useStyles();
    const [forecast, setForecast] = useState([]);
    const [cols, setCols] = useState(0);
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const makeDate = (unixTime) => new Date(unixTime * 1000).toLocaleDateString('pt-BR', options);

    useEffect(() => {
        if (props?.message) {
            const { list } = props;
            const forecastList = Object.keys(list).map(key => list[key]);
            setForecast(forecastList);
        }

    }, [props]);

    switch (props.width) {
        case 'xs':
            setCols(1);
            break;
        case 'sm':
            setCols(2);
            break;
        case 'md':
            setCols(3);
            break;
        case 'lg':
            setCols(4);
            break;
        case 'xl':
            setCols(5);
            break;

        default:
            break;
    }

    return (
        <div className={classes.root}>
            {
                forecast.length > 0 ? (
                    <GridList component="div" className={classes.gridList} spacing={1}
                        cols={cols}>
                        {forecast.map((item, index) => (
                            <GridListTile key={index}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <img
                                            className={classes.icon}
                                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                                            alt={item.weather[0].description}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Container className={classes.information}>
                                            <Typography noWrap className={classes.temp} color='textSecondary'>
                                                {`Mínima: ${Math.round(item.temp.min)}°`}
                                            </Typography>
                                            <Typography noWrap className={classes.temp} color='textSecondary'>
                                                {`Máxima: ${Math.round(item.temp.max)}°`}
                                            </Typography>
                                            <Typography noWrap className={classes.temp} color='textSecondary'>
                                                {`Umidade: ${item.humidity}%`}
                                            </Typography>
                                        </Container>
                                    </Grid>
                                </Grid>
                                <GridListTileBar
                                    title={item.weather[0].description}
                                    subtitle={`${makeDate(item.dt)}`}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                ) : null
            }
        </div>
    );
}

export default withWidth()(ForecastList);