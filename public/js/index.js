var socket = io();
socket.on('connect', function () {
  console.log('Connected to server.');


  socket.emit('createMessage', {
    to: '@Mike',
    text: 'Hey there, Sure, 6pm works for me!'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnect from server.');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
});
