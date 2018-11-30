// require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let userCount = 0;
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params,callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');

    }
    params.room = params.room.toLowerCase();  //Make room name case insensitive
    params.name = params.name.toLowerCase();

    if (users.isDuplicate(params.name)) {

      return callback('There is already a user by that name. Please try again.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name,params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat room!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => { //Listener
    var user  = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user[0].room).emit('newMessage', generateMessage(user[0].name,message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user  = users.getUser(socket.id);

    if(user) {
      io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude,coords.longitude))
    }

  });
  socket.on('disconnect', () => {
    let disconnectUser = users.getUser(socket.id); //get user info before disconnecting.
    // console.log('socket.id:', socket.id);
    // console.log('disconnectUser:', disconnectUser);
    // console.log('socket.id:', socket.id);
    // let isEmpty = (disconnectUser.length === 0);
    // console.log('is disconnectUser empty (length)?:',isEmpty);
    if(disconnectUser.length > 0) {  //Make sure to disconnect an existing user only.
      // console.log('socket.id:', socket.id);
      users.removeUser(socket.id);
      io.to(disconnectUser[0].room).emit('updateUserList', users.getUserList(disconnectUser[0].room));
      io.to(disconnectUser[0].room).emit('newMessage', generateMessage('Admin',  `${disconnectUser[0].name} has disconnected.`))
      console.log('User disconnected.');
    }

  });
});

server.listen(port, () => {  //To add: if(!module.parent) {} This will resolve the Error: listen EADDRINUSE :::3000
  console.log(`Started up on port ${port}`);
});
