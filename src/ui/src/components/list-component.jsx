import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  weatherSubtitle: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  img: {
    width: "100%",
    position: "relative",
    top: "3vh"
  },
  caption: {
    color: theme.palette.text.secondary,
    position: "relative",
    top: "-2vh"
  }
}));

const ListForecastWeather = ({ props }) => {
  const classes = useStyles();
  const options = { month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const date = new Date().toLocaleDateString('pt-BR', options);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            className={classes.weatherSubtitle}
            align="left"
            gutterBottom={true}
            variant="subtitle1">{date}
          </Typography>
          <Typography variant="h1">{`${Math.round(props.main.temp)}°`}</Typography>
          <Typography
            className={classes.weatherSubtitle}
            align="center"
            variant="subtitle1">{`Sensação térmica: ${Math.round(props.main.feels_like)}°`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img className={classes.img}
            src={`http://openweathermap.org/img/wn/${props.weather[0].icon}@4x.png`}
            alt="Imagem do clima"
          />
          <Typography
            className={classes.caption}
            align="center" gutterBottom={true}
            variant="subtitle1">{props.weather[0].description}
          </Typography>
        </Grid>
      </Grid>
      <Typography>{ props.name }</Typography>
    </div>
  );
}

export default ListForecastWeather;