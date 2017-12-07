import React, { Component } from 'react'
import { geolocated } from 'react-geolocated';
// import API actions
import {sendMessage, shareLocation} from './../api';


class MessageBar extends Component {

    state = {
        body: ''
    }

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
        return (
            <div>
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
            </div >
        )
    }
};

export default geolocated({
    positionOptions: {
        enableHigAccuracy: false,
    },
    userDecisionTimeout: 5000
}
)(MessageBar);
