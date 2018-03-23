import React, { Component } from 'react';
import './App.css';

import Inbox from './components/Inbox';

class App extends Component {
  render() {
    return <Inbox emails={this.props.emails}/>;
  }
}

export default App;