// importing client side Socket.io module 
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');


function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
};

function monitorSocket() {
    socket.on('connect', () => {
        console.log("Connected to server");
    });
    socket.on('disconnect', () => {
        console.log("Disconnected from server");
    });
};

// function monitorMessages() {
//     socket.on('newEmail', (email) => {
//         console.log("new Email");
//         console.log(email);
//     });
// };

// EMITTERS
function sendMessage(message) {
    socket.emit('createMessage', message);
};

function shareLocation(location) {
    // console.log("Location at sending: ", location);
    let body = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
    };
    // console.log("Message at sending: ", body);
    socket.emit('shareLocation', body);
};

export { subscribeToTimer, monitorSocket, sendMessage, shareLocation };