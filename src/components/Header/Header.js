import { useContext } from 'react';
import NavigationLogo from '../Logo';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import AuthContext from '../../contexts/auth/context';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f6fb',
    boxShadow: 'none',
    borderBottom: '1px solid #E2E3E5',
  },
  wrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    minHeight: '70px',
  },
}));

export default function AppBar() {
  const classes = useStyles();

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar className={classes.wrapper}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <NavigationLogo />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>{isLoggedIn ? <UserMenu /> : <AuthNav />}</Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}
