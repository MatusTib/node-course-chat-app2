// require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let userCount = 0;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');


  socket.on('createMessage', (message) => { //Listener
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

server.listen(port, () => {  //To add: if(!module.parent) {} This will resolve the Error: listen EADDRINUSE :::3000
  console.log(`Started up on port ${port}`);
});
