import React, { Component } from 'react';

// Use Socket IO in app
import openSocket from 'socket.io-client';
import {monitorSocket} from '../api';

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.socket = openSocket('http://localhost:5000');
        monitorSocket();
        this.monitorMessage();
    };

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

    render() {
        
        // Render the list of Elements
        let display = this.state.messages.map((message, idx) => {
            switch (message.type) {
                case "message":
                    return <li key={idx}>{message.from}: {message.body}</li>
                case "location":
                    return <li key={idx}><a href={`https://www.google.com/maps?q=${message.lat}%2C+${message.lng}&oq=15.5503527%2C+73.7536581`} target="_blank">{message.from}: {message.body}</a></li>
                default:
                    return <li key={idx}>{message.from}: {message.body}</li>
            }
        });
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default Chatroom;
