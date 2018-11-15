// require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let userCount = 0;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat room!'));


  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined.'));

  socket.on('createMessage', (message, callback) => { //Listener
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude))
  });
  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

server.listen(port, () => {  //To add: if(!module.parent) {} This will resolve the Error: listen EADDRINUSE :::3000
  console.log(`Started up on port ${port}`);
});
