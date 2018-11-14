import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/rr-services-white-logo.png';

const styles = theme => ({
  root: {
    margin: theme.spacing.un
  },
  logo: {
    width: '50px',
    margin: 'auto',
    padding: '0px'
  }
});

const NavBar = (props) => {
  const { classes } = props;
  return(
    <div>
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt={"logo"} className={classes.logo}/>
      </Toolbar>
    </AppBar>
    </div>
  )
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);