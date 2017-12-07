import React, { Component } from 'react';
// Use Socket IO in app
import { subscribeToTimer, monitorSocket, monitorEmail, sendMessage, shareLocation } from './api';
import { geolocated } from 'react-geolocated';

import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
    this.socket = openSocket('http://localhost:5000');
    monitorSocket();
    // monitorEmail();
    this.monitorMessage();
    // sendMessage();
    // Manage Form

  }

  state = {
    messages: [],
    timestamp: 'no timestamp yet',
    from: 'User',
    to: '',
    body: '',
  };


  monitorMessage = () => {
    // Messages received
    this.socket.on('newMessage', message => {
      console.log("New message received: ", message);
      let msgCopy = [...this.state.messages];
      msgCopy.push({ ...message });
      this.setState({ messages: msgCopy });
    });
    // Location links received
    this.socket.on('newLocationMessage', message => {

    })

  };

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: [event.target.value] }
    );


  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      body: ''
    })
  };


  render() {
    // Logs the status of 'connect' and 'disconnect'
    let display;
    // Generate the List of messages to display
    display = this.state.messages.map((message, idx) => {
      switch(message.type){ 
      case "message":
        return <li key={idx}>{message.from}: {message.body}</li>
      case "location":
        return <li key={idx}><a href={`https://www.google.com/maps?q=${message.lat}%2C+${message.lng}&oq=15.5503527%2C+73.7536581`} target="_blank">{message.from}: {message.body}</a></li>
      default: 
        return <li key={idx}>{message.from}: {message.body}</li>
      }
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
          {display}
        </p>
        <div>
          <ul>
            
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              name="body"
              value={this.state.body}
              onChange={this.handleChange} />
          </div>
          <button onClick={() => sendMessage(this.state)}>Send</button>

        </form>
        <button onClick={() => shareLocation(this.props)}>Share location</button>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHigAccuracy: false,
  },
  userDecisionTimeout: 5000
})(App);
