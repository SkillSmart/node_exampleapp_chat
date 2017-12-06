import React, { Component } from 'react';
// Use Socket IO in app
import { subscribeToTimer, monitorSocket, monitorEmail, monitorMessage, sendMessage } from './api';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
    monitorSocket();
    monitorEmail();
    monitorMessage();
    sendMessage();
    // Manage Form
    
  }

  state = {
    timestamp: 'no timestamp yet',
    to: '',
    from: '',
    message: '',
  };

  handleChange = (event) => {
    this.setState(
     {[event.target.name]: [event.target.value]}
    )
    
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

  
  render() {
    // Logs the status of 'connect' and 'disconnect'

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
          
        </p>
        <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label for="receiver">To</label>
              <input
                id="receiver"
                name="to"
                value={this.state.to}
                onChange={this.handleChange}
                type="text" />
            </div>
            <div className="input-group">
              <label for="receiver">From</label>
              <input
                id="sender"
                name="from"
                value={this.state.from}
                onChange={this.handleChange}
                type="text" />
            </div>
            <div className="input-group">
              <label for="receiver">From</label>
              <textarea
                id="message"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}/>
            </div>
          <button onClick={() => sendMessage(this.state)}>Send Message</button>

          </form>
      </div>
    );
  }
}

export default App;
