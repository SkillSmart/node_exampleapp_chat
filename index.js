const express = require('express');
// In order to enable the use of both Socket.io and express 
// for serverside dev we need to manually set up the 'http' module, 
// express uses under the hood to bring up the server
const http = require('http');
const socketIO = require('socket.io');
const _ = require('lodash');

// Set up the server
const app = express();
// Normally automatically called by express, now we manually call it
// with a callback function, that automatically accepts the express instance
let server = http.createServer(app);
// now create an io server object, which we can call to establish and handle
// socket connections in the app
let io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./server/utils/message');


// require the routes
require('./server/routes')(app);

io.on('connection', (socket) => {
    console.log("new user connected");

    // Broadcast:
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    // EMITS:   Server side listening
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));


    // LISTENER:   Client side listening
    socket.on('newEmail', (newEmail) => {
        console.log('newEmail', newEmail);
    });

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval', interval);
        setInterval(() => {
            socket.emit('timer', new Date());
        }, interval);
    });
    socket.on('createMessage', (message) => {
        console.log(message);
        let body = _.pick(message, ['from', 'body']);
        socket.broadcast.emit('newMessage', generateMessage(body.from, body.body));
    });
    socket.on('shareLocation', (location) => {
        console.log(location);
        socket.broadcast.emit('newMessage', generateLocationMessage("Admin", location));
    })
})

const route = process.env.ROUTE || 5000;

server.listen(route, () => {
    console.log(`Server successfully started on Port ${route}`);
});