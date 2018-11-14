import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/rr-services-white-logo.png';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
  root: {
    margin: theme.spacing.un
  },
  logo: {
    width: '50px',
    margin: 'auto',
    padding: '0px'
  },
  profileImg: {
    width: '40px',
    borderRadius: '20px'
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    let imageUrl = "";
    if(localStorage.getItem('USER_OBJECT')) {
      imageUrl = JSON.parse(localStorage.getItem('USER_OBJECT')).imageUrl;
    }
    this.state = {
      auth: true,
      anchorEl: null,
      imageUrl
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ auth: false, anchorEl: null });
  }
  
  render() {
    const { classes } = this.props;
    const { auth, anchorEl, imageUrl } = this.state;
    const open = Boolean(anchorEl);
    return (
      auth ?
      (<div>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt={"logo"} className={classes.logo}/>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit">
                <img alt="" src={imageUrl} className={classes.profileImg} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>) : <Redirect to="/" />
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(NavBar);