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
        socket.emit('newEmail', {
            from: 'frank@test.com',
            body: 'Hey! Well a lot is going on here!',
            createdAt: Date.now()
        });
    });
    socket.on('disconnect', () => {
        console.log("Disconnected from server");
    });
};

function monitorEmail() {
    socket.on('newEmail', (email) => {
        console.log("new Email");
        console.log(email);
    });
};

function monitorMessage() {
    socket.on('newMessage', message => {
        console.log("New message received: ", message);
    });
};


// EMITTERS
function sendMessage(message) {
    socket.emit('createMessage', message);
};


export { subscribeToTimer, monitorSocket, monitorEmail, monitorMessage, sendMessage };