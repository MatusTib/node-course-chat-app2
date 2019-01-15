let socket = io();

function scrollToBottom () {
  // Selectors
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');
  //Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  let params = $.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error.');
    }
  })
});

socket.on('displayRoomName', function(room) {
  $('#roomName').text(room).css( "text-decoration", "italic" );
})
socket.on('disconnect', function () {
  console.log('Disconnect from server.');
});
socket.on('updateUserList', function (users, room) {
  let ol = $('<ol></ol>');
  let params = $.deparam(window.location.search);

    users.forEach(function (users) {
      if (users === params.name.toLowerCase()) {  //Highlight the current user in room
          ol.append($('<li class="chat__boldUser"></li>').text(users));
        } else {
          ol.append($('<li></li>').text(users));
        }
      });

  $('#users').html(ol);
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  });
  $('#message-form').on('submit', function (e) {
    e.preventDefault();
    let messageTextbox = $('#inputmsg');
    socket.emit('createMessage', {
      text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    })
  })

  let locationButton = $('#send-location');
  locationButton.on('click', function () {
    if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },function () {
          locationButton.removeAttr('disabled');
        alert('Unable to fetch location.');
    });
  });

  socket.on('newImageMessage', function (message) {
      let formattedTime = moment(message.createdAt).format('h:mm a');
      let template = $('#image-message-template').html();
      let ba = new Uint8Array(message.img);
      let blob = new Blob( [ ba ], { type: "image/jpeg" } );

      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL( blob );

      let html = Mustache.render(template, {
        from: message.from,
        img: imageUrl,
        createdAt: formattedTime
      });
      $('#messages').append(html);
      scrollToBottom();
      imageUrl = urlCreator.revokeObjectURL( blob );
  });

    //Upload an image
    let imageSelect = $('#image-select');
    let imageFile = $('#image-file');
    imageSelect.on('click', function () { //when user clicks on the image triger the input file
        imageSelect.attr('disabled', 'disabled');
        imageFile.click();
        let count = 0; //PATCH: to fix problem of duplicate images when user selects an image one after another
        imageFile.change (function () {
            let file = document.querySelector('input[type=file]').files[0];
            if(file && count < 1) {
                let messageTextbox = $('#inputmsg');
                socket.emit('createImageMessage', {
                  img: file,
                }, function () {
                        imageSelect.removeAttr('disabled');
                });
                count = count + 1; //To prevent duplicate image messages. Count number of loops.
              } else {  //User clicked on "Cancel" button of file dialog.
                imageSelect.removeAttr('disabled');
              }
        });
        imageSelect.removeAttr('disabled');

    });
