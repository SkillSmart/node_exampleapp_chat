import React, { Component } from 'react';


// Local Imports
import PeopleBar from './components/peopleBar';
import Chatroom from './containers/chatroom';
import MessageBar from './containers/messageBar';


class App extends Component {

  state = {
    people: [{name: "Frank"}, {name: "Michael"}, {name: "Peers"}]
  }
  
  render() {

    return (
      <div className="App">
        <PeopleBar people={this.state.people}/>
        <Chatroom />
        <MessageBar />
      </div>
    );
  };
};

export default App;
