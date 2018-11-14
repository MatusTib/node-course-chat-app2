var socket = io();
socket.on('connect', function () {
  console.log('Connected to server.');

});

socket.on('disconnect', function () {
  console.log('Disconnect from server.');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

$(document).ready(function () {
  $('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('#inputmsg').val()
    }, function () {

    })
  })

})
