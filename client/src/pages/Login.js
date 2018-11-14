import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import HttpClient from '../services/HttpClient';


const styles = theme => ({

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
    // const { classes } = this.props;
    return ( 
      this.state.redirect ? <Redirect to="/" /> : (<div>
        <GoogleLogin
          clientId="695297879400-o8hcj1k3dnpjo9mm2todbdbr65kudn3n.apps.googleusercontent.com"
          scope="email"
          render={renderProps => (
            <Button variant="contained" color="primary" onClick={renderProps.onClick}>Login</Button>
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