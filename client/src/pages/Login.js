import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import HttpClient from '../services/HttpClient';
import logo from '../images/rr-services-white-logo.png'
import bg from '../images/bg.jpg'


const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${bg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundPosition:'center'
  },
  loginButton:{
    marginBottom: '70px',
    color: 'white',
    borderColor: 'white !important',
    width: '120px'
  },
  logo:{
    height: "200px"
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  responseGoogle = (res) => {
    localStorage.setItem('USER_OBJECT', JSON.stringify(res.profileObj));
    new HttpClient('/users').post(res.profileObj)
      .then((users) => {
        this.setState({
          redirect: true
        });
      });
  };
  
  render() {
    const { classes } = this.props;
    return ( 
      this.state.redirect ? <Redirect to="/" /> : (<div className={classes.root}>
      <img className={classes.logo} src={logo}></img>
      <GoogleLogin
        clientId="695297879400-o8hcj1k3dnpjo9mm2todbdbr65kudn3n.apps.googleusercontent.com"
        scope="email"
        render={renderProps => (
          <Button variant="outlined" className={classes.loginButton} color="primary" onClick={renderProps.onClick}>Login</Button>
        )}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
      
    </div>)
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Login);