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
users.forEach(function (users) {
    ol.append($('<li></li>').text(users));
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

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },function () {
          locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
  });

  socket.on('newImageMessage', function (message) {
      console.log('newImageMessage, img=', message.img);
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
      // console.log('In newImageMessage, img ByteLength is:', message.img.byteLength);
      // console.log('In newImageMessage, img is:',message.img);
      // console.log('In newImageMessage, Uint8Array ba is:',ba);
      //
      // console.log('urlCreator is:',urlCreator);
      //
      // let reader = new FileReader();

      $('#messages').append(html);
      scrollToBottom();
      imageUrl = urlCreator.revokeObjectURL( blob );
  });

    //Upload an image
    let imageSelect = $('#image-select');
    let imageFile = $('#image-file');

    imageSelect.on('click', function () { //when user clicks on the image triger the input file
        console.log('User clicked!');  //---------TRACE
        imageSelect.attr('disabled', 'disabled'); //---------TRACE
        imageFile.click();
        let count = 0; //PATCH: to fix problem of duplicate images when user selects an image one after another
        console.log('imageFile:', imageFile);

        imageFile.change (function () {

          console.log('IMAGE FILE CHANGE!', imageFile.change);
          console.log('COUNT=', count);
          console.log('imageFile Val=', imageFile.val());
          // let fileName = imageFile.val().split('\\')[imageFile.val().split('\\').length-1];
          let file = document.querySelector('input[type=file]').files[0];

          if(file && count < 1) {

            console.log('Files:', document.querySelector('input[type=file]').files);
            let fileName = file.name;//---------TRACE
            let fileType = file.type;//---------TRACE
            let fileSize = file.size;//---------TRACE

            console.log('FILE = ', file);//---------TRACE
            console.log('FILE NAME = ', fileName);//---------TRACE
            console.log('FILE TYPE = ', fileType);//---------TRACE
            console.log('FILE SIZE = ', fileSize);//---------TRACE
            // let reader = new FileReader();

            // if (file) {
            //   reader.readAsDataURL(file);
            //   console.log('File read!');//---------TRACE
            //
            // }
            // console.log('Selected fileName:', fileName);//---------TRACE
            // console.log('Selected file:', file);//---------TRACE
            //
            let messageTextbox = $('#inputmsg');

            socket.emit('createImageMessage', {
              img: file,
            }, function () {
                    // console.log('in File read createImageMessage');
                    // console.log('in File read createImageMessage, FILE 1= ',file);
                    messageTextbox.val('');
                    file = null;
                    // console.log('in File read createImageMessage, FILE 2= ',file);
            });

            count = count + 1;
          }
        });
        imageSelect.removeAttr('disabled');


    });
