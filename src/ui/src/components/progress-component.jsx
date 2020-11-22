import {CircularProgress, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
}));
export default function Progress() {
  const classes = useStyles();
  return <CircularProgress className={classes.root} size={200} color="secondary" disableShrink />;
}