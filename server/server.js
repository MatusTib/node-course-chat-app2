// require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage, generateImageMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const {Rooms} = require('./utils/rooms.js');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let userCount = 0;
let users = new Users();
let rooms = new Rooms();

app.use(express.static(publicPath));

app.get('/upload', (req,res) => {

} )
io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('displayRooms', rooms.getRoomList());  //When user connects to the join chat page display available chat rooms

  socket.on('join', (params,callback) => {
    if (!isRealString(params.name) || !isRealString(params.room) && params.options === undefined) {
      return callback('Name and room name are required.');
    }
    if (params.options && !params.room) {

      params.room = params.options;  //Make room name case insensitive
      params.name = params.name.toLowerCase();

    } else {
        params.options = undefined;
        params.room = params.room.toUpperCase();  //Make room name case insensitive
        params.name = params.name.toLowerCase();

    }

    if (users.isDuplicate(params.name, params.room)) {

      return callback('There is already a user by that name. Please try again.');
    }

    socket.join(params.room, () => {
        rooms.addRoom(params.room);
        socket.emit('displayRoomName',params.room); //Send room name to client to display in chat room
    });
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name,params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room), params.room);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat room!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => { //Listener
    let user  = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user[0].room).emit('newMessage', generateMessage(user[0].name,message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user  = users.getUser(socket.id);

    if(user) {
      io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude,coords.longitude))
    }

  });

  //createImageMessage
  socket.on('createImageMessage', (message, callback) => { //Listener
    let user  = users.getUser(socket.id);
    console.log('message.img:', message.img);//---------TRACE
    if(user) {
      io.to(user[0].room).emit('newImageMessage', generateImageMessage(user[0].name, message.img));
    }

    callback();
  });


  socket.on('disconnect', () => {
    let disconnectUser = users.getUser(socket.id); //get user info before disconnecting.
    if(disconnectUser.length > 0) {  //Make sure to disconnect an existing user only.
      users.removeUser(socket.id);
      io.to(disconnectUser[0].room).emit('updateUserList', users.getUserList(disconnectUser[0].room));
      io.to(disconnectUser[0].room).emit('newMessage', generateMessage('Admin',  `${disconnectUser[0].name} has disconnected.`))
      console.log('User disconnected.');
    }

  });
});

server.listen(port, () => {
  console.log(`Started up on port ${port}`);
});
