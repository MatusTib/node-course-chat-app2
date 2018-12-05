var socket = io();

socket.on('displayRooms', function (rooms) {
  let roomList = $('#roomList');
  let inputField = '<input type="text" name="room" autocomplete="off"/>';
  let label = '<label>Chat Rooms</label>';
  let select = '<select></select>';
  let optionItem = '<option></option>';
  let optionsList;

  let roomsFound = (rooms && rooms.length > 0);  //check to see if any rooms exist
  // console.log('roomsFound', roomsFound); //------- TRACE

  if (roomsFound) {
    // roomList.append(select);
    rooms.forEach(function (room) {
      optionItem = '<option>' + room + '</option>';
      optionsList = optionsList + optionItem;
    })
    select ='<select name="options">'+ optionsList+'</select>';
    roomList.append(select);
  }
  // console.log('optionsList=',optionsList);  //------- TRACE
  // console.log('roomList',roomList);//------- TRACE
  // console.log('Rooms=',rooms);//------- TRACE

})
