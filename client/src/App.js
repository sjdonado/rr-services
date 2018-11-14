import React, { Component } from 'react';
import NavBar from './components/NavBar';
import ReportsTable from './components/ReportsTable';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ReportsTable />
      </div>
    )
  }
}

export default App;