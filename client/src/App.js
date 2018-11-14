import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


class App extends Component {
  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
         localStorage.getItem('USER_OBJECT') !== null ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
      )} />
   );
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path='/' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;