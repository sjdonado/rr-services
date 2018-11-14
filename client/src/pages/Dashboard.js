import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import ReportsTable from '../components/ReportsTable';

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

const Login = (props) => {
  // const { classes } = props;
  return(
    <div>
        <NavBar />
        <ReportsTable />
    </div>
  )
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);