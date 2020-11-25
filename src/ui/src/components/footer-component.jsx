import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    information: {
        paddingTop: '10%'
    }
}));
const Copyright = () => {
    const classes = useStyles();

    return (
        <Typography className={classes.information} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/diegodario88">
                Diego Dario
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;